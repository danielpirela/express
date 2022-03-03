const express = require('express')
const routerAPI = require('./routes')
const cors = require('cors')

const app = express()
const port = 3000

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler')

// ! settigns
app.use(express.json())

const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  },
}
app.use(cors(options))

// ? route home
app.get('/', (req, res) => res.json('home'))

// * all routes
routerAPI(app)

// ? middlewares

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

// * app listning
app.listen(process.env.PORT || port, () => console.log(`Port ${port}`))
