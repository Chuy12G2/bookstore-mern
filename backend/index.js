import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import Book from './models/bookModel.js'

configDotenv()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/books', async(req, res) => {
  try {
    const books = await Book.find()
    res.json({
      count: books.length,
      books
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/books/:id', async(req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.post('/books', async (req, res) => {
  try {
    if(req.body.title && req.body.author && req.body.publishYear) {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
      })
      await book.save()
      res.json(book)
    } else {
      res.status(400).send('Missing required fields')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.put('/books/:id', async (req, res) => {
  try {
    if(req.body.title && req.body.author && req.body.publishYear) {
      const { id } = req.params
      const book = await Book.findByIdAndUpdate(id, req.body, { new: true })

      if(!book){
        return res.status(404).send('Book not found')
      }

      return res.status(200).json(book)
    } else {
      res.status(400).send('Missing required fields')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findByIdAndDelete(id)

    if(!book){
      return rees.status(404).send('Book not found')
    }

    return res.status(200).json({message: 'Book deleted'})
    
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

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

