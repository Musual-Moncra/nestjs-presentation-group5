#!/bin/bash
cd "/Users/musual/(Môn Học) Web Front-end/ThuyetTrinh_NestJS_Nhom5/demo-nestjs" || exit 1
echo "Đang khởi động server Demo NestJS..."
(sleep 3 && open "http://localhost:3000") &
npm run start:dev
