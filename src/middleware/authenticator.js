import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { getUserById } from '@services/user.service'
import { jwt } from '@config'
import logger from '@utils/logger'
import { AuthorizationError } from '@errors'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.secret
}

export const jwtStrategy = new Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const _user = await getUserById(jwtPayload?.id)
    if (!_user) done(new AuthorizationError('Invalid Token'))

    const user = {}
    user.id = _user?.id
    user.email = _user?.email
    user.name = _user?.firstName + ' ' + _user?.lastName
    user.role = _user?.role

    done(null, user, jwtPayload)
  } catch (error) {
    logger.error(error)
    done(new AuthorizationError('Unable to Authorize!'))
  }
})

export function authenticate () {
  return passport.authenticate('jwt', { session: false })
}
