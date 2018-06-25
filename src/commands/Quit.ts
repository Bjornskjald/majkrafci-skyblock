import Command from '../Command'

export default class Quit extends Command {
  name = 'quit'
  argc = 0

  handle () {
    this.bot.client.quit()
  }
}