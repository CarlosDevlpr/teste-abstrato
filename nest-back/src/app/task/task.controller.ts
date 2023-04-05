import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateTaskSchema, TaskSchema } from './task.model';
import { TaskService } from './task.service';
import { ObjectId } from 'mongoose';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<TaskSchema[] | []> {
    return this.taskService.getAllTasks()
  }

  @Post()
  createTask(@Body() task: CreateTaskSchema): Promise<TaskSchema | {}> {
    return this.taskService.createTask(task)
  }

  @Put(':id')
  completeTask(@Param('id') id: ObjectId): Promise<TaskSchema | {}> {
    return this.taskService.completeTask(id)  
  }

  @Delete(':id')
  deleteTask(@Param('id') id: ObjectId): Promise<TaskSchema | {}> {
    return this.taskService.deleteTask(id)  
  }
}
