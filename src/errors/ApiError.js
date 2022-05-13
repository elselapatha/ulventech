import BaseError from './BaseError'
import httpStatus from 'http-status'

export default class ApiError extends BaseError {
  constructor (message, options = {}, isPublic = false) {
    const { name, stack, status } = options || {}

    super(message, status || httpStatus.INTERNAL_SERVER_ERROR, stack, isPublic)
    if (name) this.name = name
  }
}
