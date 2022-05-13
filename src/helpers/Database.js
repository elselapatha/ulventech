import path from 'path'
import { Sequelize, DataTypes, Model, Op } from 'sequelize'

// export const sequelize = new Sequelize('sqlite::memory:')
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), 'database.sqlite')
})

sequelize.sync()

export { Sequelize, DataTypes, Model, Op }
