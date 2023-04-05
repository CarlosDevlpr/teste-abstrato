import mongoose, { ConnectOptions } from 'mongoose'
require('dotenv').config()

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}
  
interface CustomConnectOptions extends ConnectOptions {
  customOption?: boolean;
}
  
const options: CustomConnectOptions = {useNewUrlParser: true, useUnifiedTopology: true}
  
export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : '', options as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', process.env.MONGODB_URI, error);
  }
}