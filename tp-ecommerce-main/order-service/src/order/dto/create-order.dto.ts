import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty({ type: [Number], required: false })
    @IsOptional()
    @IsArray()
    productIds: number[];

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsNumber()
    stock: number;
}
