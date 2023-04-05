import { connectToDatabase } from './utils/db.connection';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app/app.module';

async function bootstrap() {
  await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  await app.listen(3001);
}
bootstrap();