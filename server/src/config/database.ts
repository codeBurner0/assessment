import { DataSource } from 'typeorm'
import { Contact } from '../models/contact.entity'
import dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.Host,
  port: +process.env.Port,
  username: process.env.DB_Username,
  password: process.env.DB_Password,
  database: process.env.Database,
  entities: [Contact],
  synchronize: true,
})
