import { Router } from 'express'

import health from './health.route'
import admin from './admin.route'
import hello from './hello.route'
import customer from './customer.route'

const routes = Router()

routes.use(health)
routes.use('/admin', admin)
routes.use('/hello', hello)
routes.use('/customer', customer)

export default routes
