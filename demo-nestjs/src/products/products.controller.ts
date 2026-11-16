import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  // Dependency Injection: NestJS tự động inject ProductsService vào Controller
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm (hỗ trợ tìm kiếm & lọc danh mục)' })
  @ApiQuery({ name: 'search', required: false, description: 'Từ khóa tìm theo tên/danh mục' })
  @ApiQuery({ name: 'category', required: false, description: 'Lọc theo tên danh mục' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): Product[] {
    return this.productsService.findAll(search, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết 1 sản phẩm theo ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Thêm sản phẩm mới (có ValidationPipe kiểm tra DTO)' })
  @ApiResponse({ status: 201, type: Product })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm theo ID' })
  @ApiResponse({ status: 200, type: Product })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm theo ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
