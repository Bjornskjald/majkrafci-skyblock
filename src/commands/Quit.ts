import Command from '../Command'
import { Bot } from '../Bot'

export default class Quit extends Command {
  name = 'quit'
  argc = 0

  handle () {
    this.bot.client.quit()
  }
}