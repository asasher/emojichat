import to from 'await-to-js'
import * as AWS from 'aws-sdk'
import { logError } from './logging'

const parse = AWS.DynamoDB.Converter.output

export async function handleDynamodbStreamEvent(event, context, useCase) {
    context.callbackWaitsForEmptyEventLoop = false
    for (const record of event.Records) {
        const payload = {
            ...parse({M: record.dynamodb.Keys}),
            ...parse({M: record.dynamodb.NewImage})
        }
        const [err] = await to<any>(useCase(payload))
        if (err) {
            logError('Got error while handling event', err)
            throw err
        }
    }
    return true
}
