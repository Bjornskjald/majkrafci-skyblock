import { createBot } from 'mineflayer'
import { MessageHandler } from './MessageHandler'
import log from 'npmlog'

export class Bot {
  client: any
  handler: MessageHandler
  password: string

  constructor (username: string, password: string) {
    this.password = password
    log.info('', 'Logging in', username, 'with password', password)
    this.client = createBot({ username, host: 'mc.majkrafci.pl', version: '1.11' })
    this.handler = new MessageHandler(this)
    this.client.on('kicked', reason => log.info('', 'Kicked for:', reason))
    this.client.on('message', this.handler.onIncoming)
    this.client.on('end', () => console.log('Rozlaczono.') || process.exit(0))
  }

  chat (message: string) {
    this.client.chat(message)
  }
  
  chatDelay (message: string, timeout: number) {
    setTimeout(() => this.chat(message), timeout)
  }
}