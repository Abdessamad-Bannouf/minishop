import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCartItemDto {
    @IsString()
    productId: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}
