import BaseError from './BaseError'
import httpStatus from 'http-status'

export default class NotfoundError extends BaseError {
  constructor (message) {
    super(message || httpStatus[httpStatus.NOT_FOUND], httpStatus.NOT_FOUND, null, true)
  }
}
