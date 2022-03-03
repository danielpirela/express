const express = require('express')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')
const productsRouter = require('./products.router')

const routerAPI = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/products', productsRouter)
}

module.exports = routerAPI
