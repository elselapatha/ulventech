import { Router } from 'express'
import validate from '@middleware/validator'
import signupSchema from '@validators/signup.schema'
import signinSchema from '@validators/signin.schema'
import * as authController from '@controllers/auth.controller'

const routes = Router()

/**
 * @openapi
 * /v1/admin/signin:
 *  post:
 *    tags:
 *      - Admin
 *    summary: Sign In to API as Admin user
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
routes.post('/signin', validate(signinSchema), authController.adminSignIn)

/**
 * @openapi
 * /v1/admin/signup:
 *  post:
 *    tags:
 *      - Admin
 *    summary: Sign Up to API as Admin user
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
routes.post('/signup', validate(signupSchema), authController.adminSignUp)

export default routes
