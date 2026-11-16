import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  // Dữ liệu mẫu khởi tạo sẵn trong bộ nhớ để demo nhanh không cần cấu hình DB ngoài
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop MacBook Air M3',
      category: 'Laptop',
      price: 26900000,
      stock: 8,
      inStock: true,
    },
    {
      id: 2,
      name: 'Bàn phím cơ Keychron K2 Pro',
      category: 'Phụ kiện',
      price: 2150000,
      stock: 15,
      inStock: true,
    },
    {
      id: 3,
      name: 'Màn hình Dell UltraSharp 27"',
      category: 'Màn hình',
      price: 11500000,
      stock: 0,
      inStock: false,
    },
    {
      id: 4,
      name: 'Tai nghe Sony WH-1000XM5',
      category: 'Âm thanh',
      price: 6890000,
      stock: 5,
      inStock: true,
    },
  ];

  private nextId = 5;

  findAll(search?: string, category?: string): Product[] {
    let result = this.products;

    if (category && category !== 'ALL') {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (search) {
      const keyword = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.category.toLowerCase().includes(keyword),
      );
    }

    return result;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID = ${id}`);
    }
    return product;
  }

  create(dto: CreateProductDto): Product {
    const stock = dto.stock ?? 0;
    const newProduct: Product = {
      id: this.nextId++,
      name: dto.name.trim(),
      category: dto.category.trim(),
      price: dto.price,
      stock,
      inStock: stock > 0,
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    const updatedStock = dto.stock !== undefined ? dto.stock : product.stock;

    Object.assign(product, {
      ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
      ...(dto.category !== undefined ? { category: dto.category.trim() } : {}),
      ...(dto.price !== undefined ? { price: dto.price } : {}),
      stock: updatedStock,
      inStock: updatedStock > 0,
    });

    return product;
  }

  remove(id: number): { deleted: boolean; id: number; message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID = ${id}`);
    }
    this.products.splice(index, 1);
    return {
      deleted: true,
      id,
      message: `Đã xóa thành công sản phẩm #${id}`,
    };
  }
}
