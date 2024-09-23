import { hex } from 'wcag-contrast'

function contrastColor(color) {
  const whiteContrast = hex(color, '#FFFFFF')
  const blackContrast = hex(color, '#000000')
  
  return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000'
}

export default contrastColor