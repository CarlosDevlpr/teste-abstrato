import mongoose from 'mongoose'

const Schema = mongoose.Schema

export type TaskSchema = {
  _id: string,
  text: string,
  completed: boolean
}

const taskSchema = new Schema({
  text: String,
  completed: Boolean,
})

export const Task = mongoose.model('tasks', taskSchema)