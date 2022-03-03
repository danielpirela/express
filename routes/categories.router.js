const express = require('express')
const CategoriesServices = require('../services/category.service')

const router = express.Router()
const service = new CategoriesServices()

router.get('/', (req, res) => {
  const categories = service.find()

  categories > 0
    ? res.status(200).json(categories)
    : res.status(404).json({ message: 'categories not found' })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const category = service.findOne(id)

  return category
    ? res.status(200).json(category)
    : res.status(404).json({ message: 'category not found' })
})

module.exports = router
