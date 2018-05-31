var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'

var chars = phrase.split('').map((char, index) => {
  return {
    char: char,
    index: index,
    failures: 0
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

function renderPhrase(chars) {
  var $phrase = document.createElement('div')
  $phrase.classList.add('phrase')
  chars.forEach(charObj => {
    $phrase.appendChild(renderChar(charObj))
  })
  document.body.appendChild($phrase)
}

function clearPhrase() {
  var $phrase = document.querySelector('.phrase')
  $phrase.remove()
}

renderPhrase(chars)

window.addEventListener('keydown', () => {
  clearPhrase()
  renderPhrase(chars)
})
