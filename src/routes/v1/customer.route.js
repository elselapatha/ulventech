import { Router } from 'express'
import validate from '@middleware/validator'
import signupSchema from '@validators/signup.schema'
import * as authController from '@controllers/auth.controller'

const routes = Router()

/**
 * @openapi
 * /v1/customer/signin:
 *  post:
 *    tags:
 *      - Customer
 *    summary: Sign In to API as Customer user
 *    description: To get access token
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    produces:
 *      - application/json
 *      - text/html
 *    parameters:
 *      - name: username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        schema:
 */
routes.post('/signin', authController.customerSignIn)

/**
 * @openapi
 * /v1/customer/signup:
 *  post:
 *    tags:
 *      - Customer
 *    summary: Sign Up to API as Customer user
 *    description: To register as user
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    produces:
 *      - application/json
 *      - text/html
 *    parameters:
 *      - name: firstName
 *        in: formData
 *        type: string
 *        required: true
 *      - name: lastName
 *        in: formData
 *        type: string
 *      - name: email
 *        in: formData
 *        type: string
 *        required: true
 *      - name: password
 *        in: formData
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: successful operation
 *        schema:
 */
routes.post('/signup', validate(signupSchema), authController.customerSignUp)

export default routes
