const faker = require('faker')

class Categorieservices {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    const limit = 4

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        name: faker.commerce.productName(),
        img: faker.image.imageUrl(),
      })
    }
  }

  create(id, name, img) {}

  find() {
    return this.categories
  }

  findOne(name) {
    return this.categories.find((category) => category.name === name)
  }
}

module.exports = Categorieservices
