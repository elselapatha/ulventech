import { Router } from 'express'
import { errorReporter, generalErrorHandler } from '@errors'

import v1 from './v1'
import docs from './docs.route'

const routes = Router()
/**
 * your version routes here
 */

routes.use('/api', docs)
routes.use('/api/v1', v1)

// NOTE - Error handlers
routes.use(errorReporter)
routes.use(generalErrorHandler)

export default routes
