import { Message } from './Message'

export class Chat {
  public id: string
  public creator: string
  public participants: string[]
  public messages: Message[]
  public createdAt: number
  public lastMessageAt: number
  public updatedAt: number
  constructor() {
    this.participants = []
    this.messages = []
  }
}