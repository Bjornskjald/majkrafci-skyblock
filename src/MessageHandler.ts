import { Bot } from './Bot'
import color from './color'
import { createInterface } from 'readline'
import Hotword from './Hotword'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

export class MessageHandler {
  bot: Bot
  hotwords: Hotword[]

  constructor (botInstance) {
    this.bot = botInstance
    this.hotwords = [
      new Hotword(
        '/tpaccept',
        'red',
        () => this.bot.chatDelay('/tpaccept', 1000)
      ),
      new Hotword(
        'Haslo zaakceptowane!',
        'green',
        () => kliknijKompas(this.bot)
      ),
      new Hotword(
        '/login <haslo>',
        'gold',
        () => this.bot.chat('/l ' + this.bot.password)
      ),
      new Hotword(
        'Teleporting to spawn.',
        'gold',
        () => this.bot.chat('/is')
      )
    ]

    rl.on('line', this.onOutgoing)
  }

  onIncoming = (message: any) => {
    if (!message.extra) return this.print(message.text)
    const parsed = message.extra.map(this.handleHotwords).map(part => part.color ? color(part.text, part.color) : part.text).join('')
    this.print(parsed)
  }

  onOutgoing = (message: string) => {
    if (!message) return
    if (message === '/quit') {
      console.info('Rozlaczono.')
      this.bot.client.end()
    } else if (message === '/end') {
      console.info('Wymuszono wylaczenie bota.')
      process.exit(0)
    } else {
      this.bot.chat(message)
    }
  }

  print (text: string) {
    const time = new Date().toTimeString().split(' ')[0]
    console.log(`[${time}] ${text}`)
  }

  handleHotwords = (part: any) => {
    const hotwordHandler = this.hotwords.find(command => command.color === part.color && command.text === part.text)
    if (hotwordHandler) hotwordHandler.exec()
    return part
  }
}

function kliknijKompas (bot: Bot) {
  bot.client.activateItem()
  bot.client.deactivateItem()
  setTimeout(() => bot.client.clickWindow(13, 0, 0, console.error), 1000)
}