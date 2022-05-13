import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ULVENTCH API',
      description: 'This is a simple rest API.',
      version: '1.0.0',
      contact: {
        name: 'Lakshitha Elapatha!',
        email: 'lakshitha.e@gmail.com'
      }
    },
    servers: [{ url: 'http://localhost:8080/api', name: 'local' }],
    tags: [
      { name: 'Admin', description: 'Admin user features' },
      { name: 'Customer', description: 'Customer user features' },
      { name: 'Hello', description: 'Hello Entity' }
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/v1/**.route.js']
}

const swaggerSpec = swaggerJSDoc(options)

const routes = Router()

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default routes
