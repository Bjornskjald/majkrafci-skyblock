import Command from '../Command'
import { Bot } from '../Bot'

export default class End extends Command {
  name = 'end'
  argc = 0

  handle () {
    process.exit(0)
  }
}