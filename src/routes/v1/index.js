import { Router } from 'express'

import health from './health.route'

const routes = Router()
/**
 * your parent routes here
 */

routes.use(health)

export default routes
