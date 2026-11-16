import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. Bật CORS để các ứng dụng Front-End (Angular, Vue, React...) gọi API dễ dàng
  app.enableCors();

  // 2. Bật ValidationPipe toàn cục để tự động kiểm tra dữ liệu DTO đầu vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. Phục vụ giao diện Demo Front-End tĩnh tại http://localhost:3000/
  app.useStaticAssets(join(process.cwd(), 'public'));

  // 4. Cấu hình Swagger UI tại http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('NestJS Demo API — Nhóm 5')
    .setDescription(
      'Demo thuyết trình môn Phát triển Web Front-End (SW306DV01). Thành viên: Nguyễn Thái Bảo (Trưởng nhóm), Trần Thành Đạt, Đặng Quang Vinh.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`\n🚀 Web Demo UI:  http://localhost:${port}`);
  console.log(`📘 Swagger API:  http://localhost:${port}/api\n`);
}
bootstrap();
