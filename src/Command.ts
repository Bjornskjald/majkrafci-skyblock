import { Bot } from './Bot'

export default class Command {
  name: string
  argc: number | undefined
  bot: Bot

  constructor (bot: Bot) {
    this.bot = bot
  }

  handle (argv: string[], sender?: string): boolean | any {
    console.dir(argv, { colors: true })
    if (typeof this.argc === 'number' && argv.length !== this.argc) {
      this.send(`Expected ${this.argc} arguments, got ${argv ? argv.length : '0'}`)
      return true
    }
    return false
  }

  send (message: string, sender?: string) {
    return sender ? this.bot.chat(`/msg ${sender} ${message}`) : this.bot.handler.print(message)
  }
}