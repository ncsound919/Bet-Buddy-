// Logging utility for the application

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
}

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'INFO'
  }

  formatMessage(level, message, metadata = {}) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata,
    }
  }

  error(message, metadata = {}) {
    const logEntry = this.formatMessage(LOG_LEVELS.ERROR, message, metadata)
    console.error(JSON.stringify(logEntry))
  }

  warn(message, metadata = {}) {
    const logEntry = this.formatMessage(LOG_LEVELS.WARN, message, metadata)
    console.warn(JSON.stringify(logEntry))
  }

  info(message, metadata = {}) {
    const logEntry = this.formatMessage(LOG_LEVELS.INFO, message, metadata)
    console.info(JSON.stringify(logEntry))
  }

  debug(message, metadata = {}) {
    if (this.logLevel === 'DEBUG') {
      const logEntry = this.formatMessage(LOG_LEVELS.DEBUG, message, metadata)
      console.log(JSON.stringify(logEntry))
    }
  }

  logRequest(req) {
    this.info('HTTP Request', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
  }

  logResponse(req, res, duration) {
    this.info('HTTP Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    })
  }
}

module.exports = new Logger()
