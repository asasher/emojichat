import { ChatEvent } from "./ChatEvent"

export class ChatCreatedEvent extends ChatEvent {
  public userId: string

  constructor({ chatId, createdAt, userId } : { chatId: string, createdAt: number, userId: string }) {
    super(chatId, 'ChatCreatedEvent', createdAt)
    this.userId = userId
  }
}