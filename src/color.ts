import 'colors'

function color (text: string, color: string): string {
  if (!text) return ''
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

export = color