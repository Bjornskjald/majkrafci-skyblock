import { Bot } from '../src/Bot'

if (process.argv.length !== 4) {
  console.log('Usage: npm start <nick> <haslo>')
  process.exit(1)
}

const bot = new Bot(process.argv[2], process.argv[3])
