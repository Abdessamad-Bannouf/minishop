import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { userId } = createOrderDto;

      const cart = await firstValueFrom(
        this.httpService.get(`http://cart-service/cart/${userId}`)
      );

      const products = await firstValueFrom(
        this.httpService.get('http://product-service/products')
      );

      let totalPrice = 0;

      // ✅ Typage explicite ici
      const validatedProducts: {
        productId: number;
        quantity: number;
        price: number;
      }[] = [];

      for (const item of cart.data.items) {
        const product = products.data.find((p) => p.id === item.productId);
        if (!product || !product.available) {
          throw new HttpException(
            `Produit indisponible : ${item.productId}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        totalPrice += product.price * item.quantity;

        validatedProducts.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      const order = this.orderRepository.create({
        userId,
        productList: validatedProducts,
        totalPrice,
        status: 'PENDING',
      });

      await this.orderRepository.save(order);

      await firstValueFrom(
        this.httpService.delete(`http://cart-service/cart/${userId}`)
      );

      return order;
    } catch (err) {
      console.error('Erreur création commande :', err);
      throw new InternalServerErrorException('Échec création commande');
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
