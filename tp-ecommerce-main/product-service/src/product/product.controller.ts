import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductDto } from './dto/get-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('products') // Groupe Swagger : "products"
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  @ApiResponse({
    status: 200,
    description: 'Liste des produits récupérée avec succès',
    type: [GetProductDto],
  })
  async findAll(): Promise<GetProductDto[]> {
    const products = await this.productService.findAll();
    return products.map((p) => new GetProductDto(p));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par son ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID du produit' })
  @ApiResponse({
    status: 200,
    description: 'Produit trouvé',
    type: GetProductDto,
  })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  async findOne(@Param('id') id: string): Promise<GetProductDto> {
    const p = await this.productService.findOne(id);
    return new GetProductDto(p);
  }
}
