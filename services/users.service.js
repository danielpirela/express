const faker = require('faker')

class UserServices {
  constructor() {
    this.users = []
    this.generate()
  }

  generate() {
    const limit = 10

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        img: faker.image.imageUrl(),
      })
    }
  }

  async create(data) {
    const newUser = await {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.users.push(newUser)

    return newUser
  }

  async find() {
    return this.users
  }

  async findOne(id) {
    return this.users.find((item) => item.id === id)
  }

  async edit(id, changes) {
    const index = this.users.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('user not found')
    }
    const user = this.users[index]
    this.users[index] = await {
      ...user,
      ...changes,
    }
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = UserServices
