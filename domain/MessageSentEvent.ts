import { ChatEvent } from "./ChatEvent"

export class MessageSentEvent extends ChatEvent {
  public userId: string
  public message: string

  constructor({chatId, userId, message, createdAt} : { chatId: string, userId: string, message: string, createdAt: number }) {
    super(chatId, 'MessageSentEvent', createdAt)
    this.userId = userId
    this.message = message
  }
}