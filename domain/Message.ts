export class Message {
  public chatId: string
  public userId: string
  public message: string
  public createdAt: number

  constructor({
    chatId,
    userId,
    message,
    createdAt
  }: {
    chatId: string,
    userId: string,
    message: string,
    createdAt: number
  }) {
    this.chatId = chatId
    this.userId = userId
    this.message = message
    this.createdAt = createdAt
  }
}
