import Command from '../Command'

export default class End extends Command {
  name = 'end'
  argc = 0

  handle () {
    process.exit(0)
  }
}