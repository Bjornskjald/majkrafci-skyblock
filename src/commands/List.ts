import Command from '../Command'
import { Bot } from '../Bot'

export default class List extends Command {
  name = 'list'
  argc = 0

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    return this.send(`Gracze online: ${Object.keys(this.bot.client.players).join(', ')}`, sender)
  }
}