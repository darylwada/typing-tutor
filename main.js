var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'

var chars = phrase.split('').map((char, index) => {
  return {
    char: char,
    index: index
  }
})

var appState = {
  chars: chars,
  currentCharIndex: 0
}

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char
  $char.setAttribute('id', charObj.index)
  if (appState.currentCharIndex === charObj.index) {
    $char.classList.toggle('current-char')
  }
  return $char
}

function renderAllChars(chars) {
  chars.forEach(charObj => {
    document.body.appendChild(renderChar(charObj))
  })
}

renderAllChars(chars)
