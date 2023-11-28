import { Router } from 'express'
import Book from '../models/bookModel.js'

const router = Router()

router.get('/', async(req, res) => {
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

router.get('/:id', async(req, res) => {
    try {
      const { id } = req.params
      const book = await Book.findById(id)
      return res.status(200).json(book)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  })

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router
