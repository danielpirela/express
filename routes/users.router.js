const express = require('express')
const UsersServices = require('../services/users.service')

const router = express.Router()
const service = new UsersServices()

router.get('/', (req, res) => {
  const users = service.find()

  return users.length > 0
    ? res.status(200).json(users)
    : res.status(404).json({ message: 'No users found' })
})

router.get('/filter', (req, res) => {
  res.json('hola')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = service.findOne(id)

  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: 'user not found' })
})

router.post('/', (req, res) => {
  const body = req.body
  const newUser = service.create(body)

  return newUser
    ? res.status(201).json({
        message: 'created',
        newUser,
      })
    : res.status(404).json({ message: 'User not created' })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const user = service.edit(id, body)
  res.json(user)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const rta = service.delete(id)

  rta
    ? res.json({
        message: 'deleted',
        data: rta,
      })
    : res.status(404).json({ message: 'Product not found' })
})
module.exports = router
