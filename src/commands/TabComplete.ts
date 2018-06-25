import Command from '../Command'

export default class TabComplete extends Command {
  name = 'tabcomplete'
  argc = 1

  handle (argv: string[], sender?: string) {
    if (super.handle(argv, sender)) return
    const self = this
    function eventListener (packet, meta) {
      self.bot.client._client.removeListener('packet', eventListener)
      if (meta.name !== 'tab_complete') return
      self.send(`Matches: ${packet.matches.join(', ')}`, sender)
    }
    this.bot.client._client.write('tab_complete', { text: `/minecraft:tell ${argv[0]}` })
    this.bot.client._client.on('packet', eventListener)
  }
}