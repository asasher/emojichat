import to from 'await-to-js'
import * as AWS from 'aws-sdk'
import * as _ from 'lodash'
import { AWS_REGION, CHAT_EVENTS_TABLE_NAME, DYNAMO_DB_LOCAL_ENDPOINT } from "../config"
import { Chat } from '../domain/Chat'
import { ChatEvent } from '../domain/ChatEvent'
import { log, logError } from "../infra/logging"
import { makeChatEvent, reduceChatEvents } from '../services/chatEventsService'

export function connectToDynamoDb() {
  if (AWS_REGION === 'localhost') {
    return new AWS.DynamoDB.DocumentClient({
      region: AWS_REGION,
      endpoint: DYNAMO_DB_LOCAL_ENDPOINT
    })
  }
  return new AWS.DynamoDB.DocumentClient()
}

export async function getChatById(id) : Promise<Chat> {
  const events = await getEventsById(id)
  if (_.isEmpty(events)) {
    throw new Error('Chat does not exist')
  }
  return reduceChatEvents(events)
}

export async function getEventsById(id) : Promise<ChatEvent[]> {
  const db = connectToDynamoDb()
  const params = {
    TableName: CHAT_EVENTS_TABLE_NAME,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": 'chatId'
    },
    ExpressionAttributeValues: {
        ":id": id
    }
  }
  const data = await db.query(params).promise()
  if (data.Items && data.Items.length > 0) {
    return _.sortBy(data.Items.map(makeChatEvent), ['createdAt'])
  }
  return []
}

export async function dispatch(event) {
  log('Saving event', event)
  const db = connectToDynamoDb()
  
  const [err, response] = await to<any>(db.put({
    TableName: CHAT_EVENTS_TABLE_NAME,
    Item: event
  }).promise())

  if (err) {
    logError('Error while trying to save chat event', err)
    throw err
  }

  log('Saved event', event)
  return response
}
