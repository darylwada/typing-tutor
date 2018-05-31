// var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'
var phrase = 'grumpy'


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

function calculateAccuracy(appState) {
  var errorCount = appState.chars.reduce((acc, charObj) => {
    return acc + charObj.failures
  }, 0)
  var keyPressCount = errorCount + appState.chars.length
  return 100 - Math.round((errorCount / keyPressCount) * 100)
}

function renderScore(appState) {
  var $score = document.createElement('div')
  $score.textContent = `Good job! You had ${calculateAccuracy(appState)}% accuracy!`
  document.body.appendChild($score)
}

renderPhrase(appState)

window.addEventListener('keydown', (event) => {

  if (event.key === appState.currentChar) {
    appState.currentCharIndex++
    if (appState.currentCharIndex > appState.chars.length - 1) {
      renderScore(appState)
      return
    }
    appState.currentChar = chars[appState.currentCharIndex].char
    appState.pressedKey = null
  }
  else {
    appState.pressedKey = event.key
  }

  clearPhrase()
  renderPhrase(appState)
})
