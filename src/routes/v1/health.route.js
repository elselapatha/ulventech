import { Router } from 'express'

const routes = Router()

routes.get('/health', (req, res) => {
  res.status(200).send({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  })
})

export default routes
