var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'

var chars = phrase.split('').map((char, index) => {
  return {
    char: char,
    index: index
  }
})

var state = {
  chars: chars,
  currentChar: 0
}

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char
  $char.setAttribute('id', charObj.index)
  return $char
}

function renderAllChars(chars) {
  chars.forEach(charObj => {
    document.body.appendChild(renderChar(charObj))
  })
}

renderAllChars(chars)
