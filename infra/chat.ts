import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'
import 'source-map-support/register'
import * as chatService from '../services/chatService'
import { handleHttpRequest } from './httpCommons'
import { handleDynamodbStreamEvent } from './streamCommons'

export function joinChat(event: APIGatewayEvent, context: Context) {
  console.log('Someone joined this chat right now')
  return handleHttpRequest(event, context, chatService.joinChat)
}

export function sendMessage(event: APIGatewayEvent, context: Context) {
  return handleHttpRequest(event, context, chatService.sendMessage)
}

export function getAllMessages(event: APIGatewayEvent, context: Context) {
  return handleHttpRequest(event, context, chatService.getAllMessages)
}

export function handleChatEvents(event, context: Context){
  return handleDynamodbStreamEvent(event, context, chatService.handleEvent)
}
