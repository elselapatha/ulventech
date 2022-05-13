import { UserType } from '@config'
import * as userService from '@services/user.service'
import * as authService from '@services/auth.service'

export async function adminSignIn (req, res, next) {
  try {
    const token = await authService.signIn(req.body?.username, req.body?.password, UserType.ADMIN)
    res.send(token)
  } catch (error) {
    next(error)
  }
}

export async function customerSignIn (req, res, next) {
  try {
    const token = await authService.signIn(req.body?.username, req.body?.password, UserType.CUSTOMER)
    res.send(token)
  } catch (error) {
    next(error)
  }
}

export async function adminSignUp (req, res, next) {
  try {
    const newUser = await userService.signUp(req.body, UserType.ADMIN)
    res.send(`${newUser.getFullName()} is registered successfully!`)
  } catch (error) {
    next(error)
  }
}

export async function customerSignUp (req, res, next) {
  try {
    const newUser = await userService.signUp(req.body, UserType.CUSTOMER)
    res.send(`${newUser.getFullName()} is registered successfully!`)
  } catch (error) {
    next(error)
  }
}
