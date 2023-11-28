import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import booksRouter from './routes/books.js'
import cors from 'cors'

configDotenv()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/books', booksRouter)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})
