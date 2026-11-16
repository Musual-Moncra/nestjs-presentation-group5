import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Chuột Logitech G Pro', description: 'Tên sản phẩm (ít nhất 2 ký tự)' })
  @IsString({ message: 'Tên sản phẩm phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @MinLength(2, { message: 'Tên sản phẩm phải có ít nhất 2 ký tự' })
  name: string;

  @ApiProperty({ example: 'Phụ kiện', description: 'Danh mục sản phẩm' })
  @IsString()
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  category: string;

  @ApiProperty({ example: 2490000, description: 'Giá bán (>= 1000 VNĐ)' })
  @IsInt({ message: 'Giá bán phải là số nguyên' })
  @Min(1000, { message: 'Giá bán phải từ 1.000 VNĐ trở lên' })
  price: number;

  @ApiProperty({ example: 10, description: 'Số lượng tồn kho (>= 0)', required: false })
  @IsOptional()
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng tồn kho không được âm' })
  stock?: number;
}
