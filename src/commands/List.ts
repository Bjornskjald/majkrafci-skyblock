import Command from '../Command'

export default class List extends Command {
  name = 'list'
  argc = 0

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    const self = this
    function eventListener (packet, meta) {
      self.bot.client._client.removeListener('packet', eventListener)
      if (meta.name !== 'tab_complete') return
      self.send(`Online: ${packet.matches.join(', ')}`, sender)
    }
    this.bot.client._client.write('tab_complete', { text: `/minecraft:tell ` })
    this.bot.client._client.on('packet', eventListener)
  }
}