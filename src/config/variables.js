import dotenv from 'dotenv'
dotenv.config()

const config = Object.freeze({
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT || 8080
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
})

const { database, server, jwt } = config

export { database, server, jwt }

export default config
