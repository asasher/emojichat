import to from 'await-to-js'
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'
import { Answer } from '../services/dto/Answer'
import { log, logError } from './logging'

export function getHttpParams(event: APIGatewayEvent) {
  return {
    ...event.pathParameters,
    ...event.queryStringParameters,
    ...JSON.parse(event.body)
  }
}

export function makeHttpResponse(answer?: Answer) {
  return {
    statusCode: answer.statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(answer.data),
  }
}

export async function handleHttpRequest(
    event: APIGatewayEvent,
    context: Context,
    useCase: (object) => Promise<Answer>
  ) {

  const requestParams = getHttpParams(event)
  const [err, result] = await to<Answer>(useCase(requestParams))
  
  if (err) {
    // Logs an error so we can see in cloud watch
    logError('Got an error while executing use case', err)
    return makeHttpResponse(new Answer(500, {
      error: 'What a Terrible Failure'
    })) // Return a 500 response
  }

  return makeHttpResponse(result)
}