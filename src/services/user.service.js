import V from 'voca'
import UserModel from '@models/user.model'
import { ApiError, BaseError, NoAccessError, NotfoundError } from '@errors'
import logger from '@utils/logger'
import { Op } from '@helpers/Database'
import omit from 'lodash/omit'

export async function getUserById (id) {
  try {
    const user = await UserModel.findOne({ where: { [Op.and]: [{ id }, { isActive: true }] } }, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } })
    return user?.toJSON()
  } catch (error) {
    if (error instanceof BaseError) throw error
    logger.error(error)
    throw new ApiError('Unable to find user!')
  }
}

/**
 * To get user by password
 * @param {String} email - The email is string value
 * @param {String} password - The password is string value
 * @returns {Promise<UserModel>}
 */
export async function getUserByPassword (email, password) {
  try {
    email = V.chain(email).lowerCase().trim().value()
    const user = await UserModel.findOne({ where: { [Op.and]: [{ email: { [Op.eq]: email } }, { isActive: true }] } })

    if (!user) throw new NotfoundError('Your account could not be found!')
    const isMatch = await user.validPassword(password)
    if (isMatch) {
      return omit(user.toJSON(), ['password'])
    } else throw new NoAccessError('Username or Password Invalid!')
  } catch (error) {
    if (error instanceof BaseError) throw error
    logger.error(error)
    throw new ApiError('Unable to find user!')
  }
}

/**
 * To Register new admin user
 * @param {Object} data - The data is an object value
 * @param {String} data.firstName - The firstName is string value
 * @param {String} data.lastName - The lastName is string value
 * @param {String} data.email - The email is string value and should be valid email
 * @param {String} data.password - The lastName is string value and must contain 6-10 characters
 * @param {String} role - The role is string value
 * @returns {Promise<UserModel>}
 */
export async function signUp (data, role) {
  try {
    const email = V.chain(data?.email).stripTags().escapeHtml().trim().lowerCase().value()

    const userCount = await UserModel.count({
      where: {
        email: { [Op.eq]: email }
      }
    })
    if (userCount > 0) throw new ApiError('Entered email already exist!', null, true)

    const firstName = V.chain(data?.firstName).stripTags().escapeHtml().escapeRegExp().titleCase().trim().value()
    const lastName = V.chain(data?.lastName).stripTags().escapeHtml().escapeRegExp().titleCase().trim().value()

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: data?.password,
      role
    })

    return user
  } catch (error) {
    if (error instanceof BaseError) throw error
    logger.error(error)
    throw new ApiError(`Unable to create ${role} account!`, null, true)
  }
}
