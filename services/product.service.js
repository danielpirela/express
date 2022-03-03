const faker = require('faker')
const boom = require('@hapi/boom')

class ProductServices {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 10

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        img: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.products.push(newProduct)

    return newProduct
  }

  find() {
    return this.products
  }

  async findOne(id, isBlock) {
    const product = this.products.find((product) => product.id === id)
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product
  }

  async edit(id, changes) {
    const index = this.products.findIndex((item) => item.id === id)

    if (index === -1) {
      throw boom.notFound('Produc not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductServices
