import { onlyEmoji } from 'emoji-aware'
import { generate as generateId } from 'shortid'
import { ChatCreatedEvent } from "../domain/ChatCreatedEvent"
import { ChatJoinedEvent } from "../domain/ChatJoinedEvent"
import { MessageSentEvent } from "../domain/MessageSentEvent"
import { log } from "../infra/logging"
import * as chatRepository from '../repositories/chatRepository'
import { makeChatEvent } from './chatEventsService'
import { Answer } from "./dto/Answer"

export async function joinChat({ id }) : Promise<Answer> {
  if (!id) {
    log('Creating new chat')
    const chatCreatedEvent = new ChatCreatedEvent({
      chatId: generateId(),
      userId: generateId(),
      createdAt: (new Date()).getTime()
    })
    await chatRepository.dispatch(chatCreatedEvent)
    return new Answer(201, {
      id: chatCreatedEvent.chatId,
      userId: chatCreatedEvent.userId
    })
  }

  log('Join existing chat')
  const chatJoinedEvent= new ChatJoinedEvent({
    chatId: id,
    userId: generateId(),
    createdAt: (new Date()).getTime()
  })
  await chatRepository.dispatch(chatJoinedEvent)
  return new Answer(200, {
    id: chatJoinedEvent.chatId,
    userId: chatJoinedEvent.userId
  })  
}

export async function sendMessage({ chatId, userId, message }) : Promise<Answer> {
  log('Sending message')
  const emojiOnlyMsg = onlyEmoji(message).join('')

  if (message === '🔥') {
    // This is to showcase alarms
    throw new Error('Something wicked this way comes')
  }
  
  const messageSentEvent = new MessageSentEvent({
    chatId,
    userId,
    message: emojiOnlyMsg,
    createdAt: (new Date()).getTime()
  })
  await chatRepository.dispatch(messageSentEvent)
  
  return new Answer(201, {
    chatId: messageSentEvent.chatId,
    userId: messageSentEvent.userId,
    message: messageSentEvent.message
  })
}

export async function getAllMessages({ id }) : Promise<Answer> {
  log('Getting all messages')
  const chat = await chatRepository.getChatById(id)
  if (!chat) {
    return new Answer(404, {
      message: 'These are not the droids you\'re looking for'
    })
  }
  return new Answer(200, chat)
}

export async function handleEvent(event) {
  log('Got chat event', event)
  event = makeChatEvent(event)
  switch(event.type) {
    case 'MessageSentEvent': {
      const { message, createdAt } = event as MessageSentEvent
      
      const diff = (new Date()).getTime() - createdAt
      if (diff < 10*1000) {
        // Ignore events older than 10 secs
        return true
      }
      
      if (message === '😈') {
        // This is to showcase alarms
        throw new Error('Something wicked this way comes')
      }
    }
  }
  return true
}