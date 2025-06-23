import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('order') // groupe Swagger
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande' })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 201, description: 'Commande créée' })
  create(
      @Headers('x-user-id') userId: string,
      @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
