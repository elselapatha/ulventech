import { UserType } from '@config'
import { allow } from '@middleware/allow'
import { authenticate } from '@middleware/authenticator'
import { Router } from 'express'
import * as helloController from '@controllers/hello.controller'

const routes = Router()

/**
 * @openapi
 * /v1/hello/admin:
 *  get:
 *    tags:
 *      - Hello
 *  summary: Say Hello  to admin
 *  description: To Say hello
 *  produces:
 *    - text/html
 *  response:
 *    200:
 *      description: successful operation
 *    401:
 *      description: unauthorized operation
 *    403:
 *      description: access denied
 *
 */
routes.get('/admin', authenticate(), allow(UserType.ADMIN), helloController.hello)

/**
 * @openapi
 * /v1/hello/customer:
 *  get:
 *    tags:
 *      - Hello
 *  summary: Say hello to customer
 *  description: To Say hello
 *  produces:
 *    - text/html
 *  security:
 *    - jwtAuth:
 *  response:
 *    200:
 *      description: successful operation
 *    401:
 *      description: unauthorized operation
 *    403:
 *      description: access denied.
 */
routes.get('/customer', authenticate(), allow(UserType.CUSTOMER), helloController.hello)

export default routes
