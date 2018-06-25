import Command from '../Command'
import { Bot } from '../Bot'

export default class Stats extends Command {
  name = 'stats'
  argc = 0

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    return this.send(`Zycie: ${this.bot.client.health}. Jedzenie: ${this.bot.client.food}`, sender)
  }
}