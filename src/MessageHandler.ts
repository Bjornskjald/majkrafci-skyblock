import { Bot } from './Bot'
import color from './color'
import { createInterface } from 'readline'
import Hotword from './Hotword'
import Command from './Command'
import Stats from './commands/Stats'
import Quit from './commands/Quit'
import End from './commands/End'
import Echo from './commands/Echo'
import TabComplete from './commands/TabComplete'
import List from './commands/List'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  prompt: '> '
})

export class MessageHandler {
  bot: Bot
  hotwords: Hotword[]
  commands: Command[]

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

    this.commands = [
      new Echo(this.bot),
      new End(this.bot),
      new List(this.bot),
      new Quit(this.bot),
      new Stats(this.bot),
      new TabComplete(this.bot)
    ]

    rl.on('line', this.onOutgoing)
  }

  onIncoming = (message: any) => {
    if (!message.extra) return this.print(message.text)
    if (this.isPM(message)) {
      const { sender, content } = this.isPM(message)
      if (this.handleCommands(content, sender)) return
    }
    const parsed = message.extra.map(this.handleHotwords).map(part => part.color ? color(part.text, part.color) : part.text).join('')
    this.print(parsed)
  }

  onOutgoing = (message: string) => {
    if (!message) return
    if (this.handleCommands(message)) return
    this.bot.chat(message)
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

  handleCommands (message: string, sender?: string): boolean {
    const command = message.split(' ')[0].substr(1)
    const args = message.replace('/' + command, '').split(' ').map(el => el.trim()).filter(el => el)
    const commandHandler = this.commands.find(el => el.name === command)
    if (commandHandler) return commandHandler.handle(args, sender) || true
    return false
  }
  
  isPM (message: any): any | boolean {
    if (!message.extra || message.extra.length < 6) return false
    const parts = message.extra
    if (
      parts[2].text === '->' &&
      parts[2].color === 'gold' &&

      parts[3].text === 'Ja' && 
      parts[3].color === 'red'
    ) return { sender: parts[1].text, content: parts[5].text }
    return false
  }
}

function kliknijKompas (bot: Bot) {
  bot.client.activateItem()
  bot.client.deactivateItem()
  setTimeout(() => bot.client.clickWindow(13, 0, 0, console.error), 1000)
}