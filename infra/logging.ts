import * as parseError from 'parse-error'

export function log(msg, content?) {
  console.log(
    JSON.stringify({
      msg,
      ...content
    }, null, 2)
  )
}

export function logError(msg, error) {
  console.log(
    JSON.stringify({
      msg,
      isError: true, // For logs
      error: parseError(error)
    }, null, 2)
  )
}