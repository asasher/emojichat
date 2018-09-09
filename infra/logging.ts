import * as parseError from 'parse-error'

export function log(msg, content?) {
  console.log(
    JSON.stringify({
      msg,
      ...content
    })
  )
}

export function logError(msg, error) {
  console.log(
    JSON.stringify({
      msg,
      error: parseError(error)
    })
  )
}