const tpaccept = true // Czy przyjmować domyślnie wszystkie żądania teleportacji?

const mineflayer = require('mineflayer')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
require('colors')

function koloruj (text, color) {
  if (!text) return
  switch (color) {
    case 'black': return text.black.bgWhite
    case 'dark_blue': return text.blue
    case 'dark_green': return text.green.dim
    case 'dark_aqua': return text.cyan.dim
    case 'dark_red': return text.red.dim
    case 'dark_purple': return text.magenta.dim
    case 'gold': return text.yellow.dim
    case 'gray': return text.grey
    case 'dark_gray': return text.grey
    case 'blue': return text.blue
    case 'green': return text.green
    case 'aqua': return text.cyan
    case 'red': return text.red
    case 'light_purple': return text.magenta
    case 'yellow': return text.yellow
    case 'white':
    default: return text
  }
}

if (process.argv.length !== 4) {
  console.log('Usage : node index.js <nick> <haslo>')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: 'mc.majkrafci.pl',
  port: 25565,
  username: process.argv[2],
  version: '1.10', // 1.11 jest niestabilne
  verbose: true
})

bot.on('connect', () => {
  console.log('Polaczono!')
  setTimeout(() => bot.chat('/l ' + process.argv[3]), 5000)
})

bot.on('end', () => {
  console.log('Rozlaczono.')
  process.exit(0)
})

bot.on('message', message => {
  if (!message.extra) return console.log(message)
  console.log(message.extra.map(el => {
    if (tpaccept && el.text === '/tpaccept' && el.color === 'red') {
      setTimeout(() => bot.chat('/tpaccept'), 1000)
    }
    if (el.text === 'Haslo zaakceptowane!' && el.color === 'green') {
      console.log('Zalogowano na lobby.')
      setTimeout(kliknijKompas, 1000)
    }
    if (el.text === 'Teleporting to spawn.' && el.color === 'gold') {
      bot.setControlState('jump', true)
      bot.setControlState('forward', true)
      bot.setControlState('sprint', true)
      setTimeout(() => bot.clearControlState(), 2000)
    }
    return el.color ? koloruj(el.text, el.color) : el.text
  }).join(''))
})

rl.on('line', line => {
  if (!line) return
  if (line === '/quit') {
    console.info('Rozlaczono.')
    bot.end()
  } else if (line === '/end') {
    console.info('Wymuszono wylaczenie bota.')
    process.exit(0)
  } else {
    bot.chat(line)
  }
})

function kliknijKompas () {
  bot.activateItem()
  bot.deactivateItem()
  setTimeout(() => bot.clickWindow(13, 0, 0, console.error), 1000)
}
