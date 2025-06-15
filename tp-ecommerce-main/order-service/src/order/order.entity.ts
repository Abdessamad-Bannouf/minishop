import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('simple-json')
  productList: {
    productId: number;
    quantity: number;
    price: number;
  }[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
