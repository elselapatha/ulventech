import figlet from 'figlet'
import ExpressBuilder from '@helpers/ExpressBuilder'
import routes from '@routes'

// ANCHOR - Print emblem
console.log(figlet.textSync('ULVENTECH API'))
console.log('-------------------------------------------------------------------------')

const app = new ExpressBuilder()
  .setRoutes(routes)
  .build()

export default app
