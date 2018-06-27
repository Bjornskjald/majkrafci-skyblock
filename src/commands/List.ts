import Command from '../Command'

export default class List extends Command {
  name = 'list'
  argc = 0

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    const self = this
    function eventListener (packet, meta) {
      if (meta.name !== 'tab_complete') return
      self.bot.client._client.removeListener('packet', eventListener)
      self.send(`Online: ${packet.matches.join(', ')}`, sender)
      const vanished = packet.matches.filter(el => !self.bot.client.players.includes(el))
      self.send(`Vanished: ${vanished.join(', ')}`, sender)
    }
    this.bot.client._client.write('tab_complete', { text: `/minecraft:tell ` })
    this.bot.client._client.on('packet', eventListener)
  }
}