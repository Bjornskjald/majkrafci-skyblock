export default class Hotword {
  text: string
  color: string
  exec: Function

  constructor (text: string, color: string, executor: Function) {
    this.text = text
    this.color = color
    this.exec = executor
  }
}