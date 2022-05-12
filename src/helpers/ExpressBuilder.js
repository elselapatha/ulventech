import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import passport from 'passport'
import compress from 'compression'

export default class ExpressBuilder {
  #routes = null
  #strategy

  setRoutes (routes) {
    if (routes) {
      this.#routes = routes
    }
    return this
  }

  setStrategy (strategy) {
    if (strategy) this.#strategy = strategy
    return this
  }

  build () {
    const app = express()
    app.use(cors())
    app.use(helmet())
    app.use(compress())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(passport.initialize())
    app.use(express.urlencoded({ extended: true }))
    // ANCHOR - validate routes
    if (Object.getPrototypeOf(this.#routes) === express.Router) {
      app.use(this.#routes)
    } else console.warn('WARN: There are no valid express routes available.')
    if (this.#strategy) {
      passport.use(this.#strategy)
    }
    return app
  }
}
