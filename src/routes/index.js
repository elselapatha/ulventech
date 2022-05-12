import { Router } from 'express'

import v1 from './v1'

const routes = Router()
/**
 * your version routes here
 */

routes.use('/api/v1', v1)

export default routes
