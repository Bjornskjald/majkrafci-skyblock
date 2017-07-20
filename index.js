const tpaccept = false // Czy przyjmować domyślnie wszystkie żądania teleportacji?

const mineflayer = require('mineflayer')
const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})
require('colors')

/*
function efekty(text, effect){
	if(typeof text !== 'undefined'){
	switch(effect){
		case "bold":
			return text.bold
			break;
		case "underline":
			return text.underline
			break;
		case "italic":
			return text.italic
			break;
		case "strike":
			return text.strike
			break;
		case "obfuscated":
			return text.bgRed
			break;
	}}
}
*/
function koloruj(text, color){
	if(typeof text !== 'undefined'){
		switch(color){
			case "black":
				return text.black.bgWhite
				break;
			case "dark_blue":
				return text.blue
				break;
			case "dark_green":
				return text.green.dim
				break;
			case "dark_aqua":
				return text.cyan.dim
				break;
			case "dark_red":
				return text.red.dim
				break;
			case "dark_purple":
				return text.magenta.dim
				break;
			case "gold":
				return text.yellow.dim
				break;
			case "gray":
				return text.grey
				break;
			case "dark_gray":
				return text.grey
				break;
			case "blue":
				return text.blue
				break;
			case "green":
				return text.green
				break;
			case "aqua":
				return text.cyan
				break;
			case "red":
				return text.red
				break;
			case "light_purple":
				return text.magenta
				break;
			case "yellow":
				return text.yellow
				break;
			case "white":
				return text
				break;
			default:
				return text
				break;
		}
	}
}

if(process.argv.length !== 5) {
	console.log("Usage : node index.js <nick> <haslo>");
	process.exit(1);
}

var bot = mineflayer.createBot({
	host: 'mc.majkrafci.pl',
	port: 25565,
	username: process.argv[2],
	version: "1.10", // 1.11 jest niestabilne
	verbose: true,
});
bot.on('connect', () => {
	setTimeout(zaloguj, 5000);
})
bot.on('end', () => {
	console.log('Rozlaczono.')
	process.exit(0)
})
bot.on('message', (message) => {
	var wiadomosc = []
	if(typeof message.extra === 'object'){
		message.extra.forEach(function(el){
			if(tpaccept && tekst === '/tpaccept' && el.color === 'red'){
				setTimeout(() => { bot.chat('/tpaccept') },1000)
			}
			var tekst = el.text
			if(el.color) var tekst = koloruj(tekst, el.color)
			wiadomosc.push(tekst)
		})
	}
	console.log(wiadomosc.join(''))
});

rl.on('line', function(line) {
	if(line == '') {
		return;
	} else if(line == '/quit') {
		console.info('Rozlaczono.');
		bot.end();
		return;
	} else if(line == '/end') {
		console.info('Wymuszono wylaczenie bota.');
		process.exit(0);
		return;
	} else {
		bot.chat(line)
	}
});

function zaloguj(){
	bot.chat("/l " + process.argv[3]);
	console.log("Zalogowano na lobby.");
	setTimeout(kliknijKompas, 5000);
}
function kliknijKompas(){
	bot.activateItem();bot.deactivateItem();
	setTimeout(wybierzSkyb, 1000);
}
function wybierzSkyb(){
	bot.clickWindow(13, 0, 0, function(err){console.error(err)});
	setTimeout(przywitajSie, 5000);
}
function przywitajSie(){
	// bot.chat(`BOT ${process.argv[2]} joined the game.`);
	console.log("Polaczono ze skyblockiem")
}
