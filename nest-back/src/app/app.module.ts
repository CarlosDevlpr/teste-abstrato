import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import * as cors from 'cors';


@Module({
  imports: [],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const corsOptions: cors.CorsOptions = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    };
    consumer
      .apply(cors(corsOptions))
      .forRoutes('*');
  }
}
