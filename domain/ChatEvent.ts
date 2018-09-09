export class ChatEvent {
  public chatId: string
  public createdAt: number
  public type: string

  constructor(chatId: string, type: string, createdAt: number) {
    this.chatId = chatId
    this.type = type
    this.createdAt = createdAt
  }
}