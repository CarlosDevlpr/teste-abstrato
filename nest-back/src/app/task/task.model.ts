import mongoose, { ObjectId } from 'mongoose'

export type CreateTaskSchema = {
    text: string,
    completed: boolean
} 

export type TaskSchema = {
    _id: ObjectId,
    text: string,
    completed: boolean
} 

const Schema = mongoose.Schema

const taskSchema = new Schema({
  text: String,
  completed: Boolean,
})

export const Task = mongoose.model<TaskSchema>('tasks', taskSchema)