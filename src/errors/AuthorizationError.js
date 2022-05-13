import BaseError from './BaseError'
import httpStatus from 'http-status'

export default class AuthorizationError extends BaseError {
  constructor (message) {
    super(message || httpStatus[httpStatus.UNAUTHORIZED], httpStatus.UNAUTHORIZED, null, true)
  }
}
