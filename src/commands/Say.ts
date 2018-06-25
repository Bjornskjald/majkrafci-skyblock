import Command from '../Command'

export default class Say extends Command {
  name = 'say'

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    return this.bot.chat(argv.join(' '))
  }
}