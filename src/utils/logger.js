import { format, createLogger, transports } from 'winston'

const pretty = (data) => {
  const timestamp = data?.metadata.timestamp || data.timestamp
  const level = data?.metadata.level || data.level
  const label = data?.metadata.label || data.label
  const stack = data?.metadata.stack || data.stack
  const message = data?.metadata.message || data.message

  if (stack) {
    return `${timestamp} [${label}] ${level}: ${message} \n${stack}`
  } else {
    return `${timestamp} [${label}] ${level}: ${message}`
  }
}

export default createLogger({
  exitOnError: false,
  transports: [
    new transports.Console({ handleExceptions: true })
  ],
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    format.label({ label: 'ULVENTECH' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['label', 'level', 'message'] }),
    format.printf(pretty)
  )
})
