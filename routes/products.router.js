const express = require('express')
const ProductServices = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')

const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema')

const router = express.Router()
const service = new ProductServices()

router.get('/', async (req, res) => {
  const products = await service.find()

  return products.length > 0
    ? res.status(200).json(products)
    : res.status(404).json({ message: 'No products found' })
})

router.get('/filter', (req, res) => {
  res.json('hola')
})

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)

      return res.status(201).json({
        message: 'created',
        data: newProduct,
      })
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }
)

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.edit(id, body)
      res.json(product)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const rta = await service.delete(id)
    res.json({
      message: 'deleted',
      data: rta,
    })
  } catch (err) {
    res.status(404).json({
      message: err.message,
    })
  }
})

module.exports = router
