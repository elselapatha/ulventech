import BaseError from './BaseError'
import httpStatus from 'http-status'

export default class NoAccessError extends BaseError {
  constructor (message) {
    super(message || httpStatus[httpStatus.FORBIDDEN], httpStatus.FORBIDDEN, null, true)
  }
}
