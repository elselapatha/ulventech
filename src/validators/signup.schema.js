import Joi from 'joi'

export default {
  body: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required()
  })
}
