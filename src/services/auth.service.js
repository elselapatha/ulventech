import V from 'voca'
import Jwt from 'jsonwebtoken'
import { getUserByPassword } from './user.service'
import { ApiError, BaseError, NoAccessError } from '@errors'
import logger from '@utils/logger'
import { jwt } from '@config'

export async function signIn (username, password, role) {
  try {
    const user = await getUserByPassword(username, password)
    if (V.matches(role, user.role)) {
      const token = Jwt.sign({ id: user.id }, jwt.secret, { expiresIn: '1h' })
      return token
    } else throw new NoAccessError('You have not enough permission! Please use relevant URL.')
  } catch (error) {
    if (error instanceof BaseError) throw error
    logger.error(error)
    throw new ApiError('Unable to Authenticate!')
  }
}
