import { ValidationError } from 'Errors'

const validOptions = ['body', 'params', 'query']

/**
 * to validate body, params or query in the request
 * @param {Object} schemas - The schemas is object and only allow body,params and query. Those three keys anc contains @hapi/joi schema objects
 * @returns {Function}
 */
export default function (schemas) {
  return (req, res, next) => {
    const criteria = Object.keys(schemas)
      .filter((key) => validOptions.includes(key))
      .map((key) => {
        const { error } = schemas[`${key}`].validate(req[`${key}`], { abortEarly: true })
        return error
      })
      .filter((error) => !!error)
      .map(({ details }) => details.map((i) => i.message))
      .flat()

    if (criteria.length > 0) {
      const message = criteria.join(', ')
      return next(new ValidationError(message))
    } else next()
  }
}
