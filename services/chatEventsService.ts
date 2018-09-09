import { Chat } from "../domain/Chat"
import { ChatCreatedEvent } from "../domain/ChatCreatedEvent"
import { ChatEvent } from "../domain/ChatEvent"
import { ChatJoinedEvent } from "../domain/ChatJoinedEvent"
import { Message } from "../domain/Message"
import { MessageSentEvent } from "../domain/MessageSentEvent"

export function makeChatEvent(event) {
  switch(event.type) {
    case 'ChatCreatedEvent': return new ChatCreatedEvent(event)
    case 'ChatJoinedEvent': return new ChatJoinedEvent(event)
    case 'MessageSentEvent': return new MessageSentEvent(event)
    default: return new ChatEvent(event.chatId, event.type, event.createdAt)
  }
}

function chatEventsReducer(chat: Chat, event: ChatEvent) {
  switch(event.type) {
    case 'ChatCreatedEvent': {
      const { chatId, userId, createdAt} = event as ChatCreatedEvent
      chat.id = chatId
      chat.creator = userId
      chat.participants.push(userId)
      chat.createdAt = createdAt
      chat.updatedAt = createdAt
      break
    }
    case 'ChatJoinedEvent': {
      const { userId, createdAt } = event as ChatJoinedEvent
      chat.participants.push(userId)
      chat.updatedAt = createdAt
      break
    }
    case 'MessageSentEvent': {
      const { userId, message, createdAt } = event as MessageSentEvent
      chat.messages.push(new Message({
        chatId: chat.id,
        userId,
        message,
        createdAt
      }))
      chat.updatedAt = createdAt
      break
    }
  }
  return chat
}

export function reduceChatEvents(events: ChatEvent[]) : Chat {
  return events.reduce(chatEventsReducer, new Chat())
}