import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1, description: 'ID duy nhất của sản phẩm' })
  id: number;

  @ApiProperty({ example: 'Bàn phím cơ Keychron K2', description: 'Tên sản phẩm' })
  name: string;

  @ApiProperty({ example: 'Phụ kiện', description: 'Danh mục sản phẩm' })
  category: string;

  @ApiProperty({ example: 1850000, description: 'Giá bán (VNĐ)' })
  price: number;

  @ApiProperty({ example: 15, description: 'Số lượng tồn kho' })
  stock: number;

  @ApiProperty({ example: true, description: 'Trạng thái đang kinh doanh' })
  inStock: boolean;
}
