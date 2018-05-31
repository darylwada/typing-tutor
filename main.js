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
  currentChar: chars[0].char,
  currentCharIndex: 0,
  pressedKey: null
}

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char
  $char.setAttribute('id', charObj.index)

  if (appState.currentCharIndex === charObj.index) {
    $char.classList.toggle('current-char')
    if (appState.pressedKey !== charObj.char && appState.pressedKey !== null) {
      $char.classList.toggle('failed')
      charObj.failures++
    }
  }

  return $char
}

function renderPhrase(appState) {
  var $phrase = document.createElement('div')
  $phrase.classList.add('phrase')

  appState.chars.forEach(charObj => {
    $phrase.appendChild(renderChar(charObj))
  })

  document.body.appendChild($phrase)
}

function clearPhrase() {
  var $phrase = document.querySelector('.phrase')
  $phrase.remove()
}

renderPhrase(appState)

window.addEventListener('keydown', (event) => {

  if (event.key === appState.currentChar) {
    appState.currentCharIndex++
    appState.currentChar = chars[appState.currentCharIndex].char
    appState.pressedKey = null
  }
  else {
    appState.pressedKey = event.key
  }

  clearPhrase()
  renderPhrase(appState)
})
