import express from 'express'
import { AppDataSource } from './src/config/database'
import contactRoutes from './src/routes/contact.routes'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized')
    app.listen(5000, () => console.log('Server running on port 5000'))
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
app.use('/api', contactRoutes)
