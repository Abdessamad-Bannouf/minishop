import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  @ApiOperation({ summary: 'Récupérer le panier de l’utilisateur' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Panier récupéré' })
  findOne(@Headers('x-user-id') userId: string) {
    return this.cartService.findOne(userId);
  }

  @Post('')
  @ApiOperation({ summary: 'Créer un panier' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 201, description: 'Panier créé' })
  create(
      @Headers('x-user-id') userId: string,
      @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartService.create(createCartDto);
  }

  @Patch('')
  @ApiOperation({ summary: 'Mettre à jour un panier' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Panier mis à jour' })
  update(
      @Headers('x-user-id') userId: string,
      @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(userId, updateCartDto);
  }

  @Delete('')
  @ApiOperation({ summary: 'Supprimer un panier' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, description: 'Panier supprimé' })
  remove(@Headers('x-user-id') userId: string) {
    return this.cartService.remove(userId);
  }
}
