import Joi from 'joi'

export default {
  body: Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required()
  })
}
