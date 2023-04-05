import { Injectable } from '@nestjs/common';
import { CreateTaskSchema, Task, TaskSchema } from './task.model';
import { ObjectId } from 'mongoose';

@Injectable()
export class TaskService { 

  async getAllTasks(): Promise<TaskSchema[] | []> {
    const allTasks = await Task.find().exec()
    return allTasks.map(task => task.toObject());
  }

  async createTask (task: CreateTaskSchema): Promise<TaskSchema | {}> {
    const createdTask = new Task(task)
    const savedTask = await createdTask.save()
    return savedTask.toObject()
  }

  async completeTask (id: ObjectId): Promise<TaskSchema | {}> {
    try {
      const task = await Task.findById(id)
      task.completed = !task.completed
      await task.save()
      return task
    } catch(err) {
      throw new Error('Task Not Found')
    }
    
  }

  async deleteTask (id: ObjectId): Promise<TaskSchema | {}> {
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) return {"response": "Task Not Found"}
    return deletedTask.toObject()
  }
}