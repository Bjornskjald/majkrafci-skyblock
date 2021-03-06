import Command from '../Command'

export default class Echo extends Command {
  name = 'echo'

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    return this.send(argv.join(' '), sender)
  }
}