import { UserType } from '@config'
import { NoAccessError } from '@errors'
import filter from 'lodash/filter'

const types = Object.values(UserType)

export function allow (...roles) {
  const allowedRoles = filter(roles, (s) => types.includes(s))

  return (req, res, next) => {
    const role = req?.user?.role
    const isAllowed = allowedRoles.includes(role)
    if (isAllowed || allowedRoles.length === 0) {
      next()
    }

    next(new NoAccessError('Not enough permissions or invalid URL.'))
  }
}
