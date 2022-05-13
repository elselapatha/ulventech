import BaseError from './BaseError'
import httpStatus from 'http-status'

export default class ValidationError extends BaseError {
  constructor (message, name) {
    super(message, httpStatus.BAD_REQUEST, undefined, true)
    this.name = name || 'ValidationError'
  }
}
