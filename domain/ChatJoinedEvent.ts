import { generate as generateId } from 'shortid'
import { ChatEvent } from "./ChatEvent"

export class ChatJoinedEvent extends ChatEvent {
  public userId: string

  constructor({chatId, userId, createdAt} : { chatId: string, userId: string, createdAt: number }) {
    super(chatId, 'ChatJoinedEvent', createdAt)
    this.userId = userId
  }
}