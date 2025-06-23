import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Order} from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      name: createOrderDto.name,
      description: createOrderDto.description,
      price: createOrderDto.price,
      imageUrl: createOrderDto.imageUrl,
      stock: createOrderDto.stock,
      userId: createOrderDto.userId,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Order> {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
