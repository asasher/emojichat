export class Answer {
  public statusCode: number
  public data: any

  constructor(statusCode, data) {
    this.statusCode = statusCode
    this.data = data
  }
}