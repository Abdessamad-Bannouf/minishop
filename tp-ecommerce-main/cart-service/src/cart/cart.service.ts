import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart)
      private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async findOne(id: string): Promise<Cart> {
    return this.cartRepository.findOneOrFail({
      where: { id },
    });
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepository.create({
      name: createCartDto.name,
      description: createCartDto.description,
      price: 20,
      imageUrl: 'test',
      stock: false,
    });

    return this.cartRepository.save(cart); // sauvegarde en base
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<UpdateResult> {
    return this.cartRepository.update(id, {
      name: updateCartDto.name,
      description: updateCartDto.description,
      price: 20,
      imageUrl: 'test',
      stock: false,
    });
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.findOne(id);
    return this.cartRepository.remove(cart);
  }
}
