export default class BaseError extends Error {
  constructor (message, status, stack, isPublic = false) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    this.isPublic = isPublic
    this.isOperational = true
    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor.name)
  }
}
