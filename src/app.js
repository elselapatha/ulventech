import figlet from 'figlet'
import ExpressBuilder from '@helpers/ExpressBuilder'
import routes from '@routes'
import { server } from '@config/variables'
import { jwtStrategy } from '@middleware/authenticator'
import { uncaughtExceptionHandler, unhandledRejectionHandler } from '@errors'

// ANCHOR - Print emblem
console.log(figlet.textSync('ULVENTECH API'))
console.log('-------------------------------------------------------------------------')

const app = new ExpressBuilder()
  .setStrategy(jwtStrategy)
  .setRoutes(routes)
  .build()

// ANCHOR setting port to server
app.set(server.port)

process
  .on('unhandledRejection', unhandledRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler)

export default app
