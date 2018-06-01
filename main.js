var people = ['Ron', 'Tim', 'Daryl', 'Jerome', 'Arthur', 'Taylor', 'Jeff', 'Franz', 'JJ']
var verbs = ['poked', 'destroyed', 'created', 'kicked', 'threw', 'punched', 'fought', 'laughed at', 'ran away from']
var articles = ['my', 'your', 'the', 'a', 'his', 'that', 'her']
var adjectives = ['grumpy', 'polite', 'stupid', 'crazy', 'huge', 'tiny', 'obnoxious', 'friendly', 'ugly', 'old']
var nouns = ['cat', 'potato', 'puppy', 'refrigerator', 'llama', 'computer', 'idiot', 'airplane'];

function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function generatePhrase() {
  return [ people[randomIndex(people)], verbs[randomIndex(verbs)], articles[randomIndex(articles)]
         , adjectives[randomIndex(adjectives)], nouns[randomIndex(nouns)] ].join(' ')
}

function getChars(phrase) {
  var chars = phrase.split('').map((char, index) => {
    return {
      char: char,
      index: index,
      failures: 0
    }
  })
  return chars
}

var chars = getChars(generatePhrase())

var appState = {
  chars: chars,
  currentChar: chars[0].char,
  currentCharIndex: 0,
  pressedKey: null,
  gameOver: false
}

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char

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

function calculateAccuracy(appState) {
  var errorCount = appState.chars.reduce((acc, charObj) => {
    return acc + charObj.failures
  }, 0)
  var keyPressCount = errorCount + appState.chars.length
  return 100 - Math.round((errorCount / keyPressCount) * 100)
}

function renderScore(appState) {
  var $score = document.createElement('div')
  $score.classList.add('score')
  $score.textContent = `Good job! You had ${calculateAccuracy(appState)}% accuracy!`
  document.body.appendChild($score)
}

function renderPrompt() {
  var $prompt = document.createElement('div')
  $prompt.classList.add('prompt')
  $prompt.textContent = 'Press any key to play again...'
  document.body.appendChild($prompt)
}

function clearGame() {
  var gameElements = Array.from(document.body.children).slice(2)
  gameElements.forEach(element => element.remove())
}

renderPhrase(appState)

window.addEventListener('keydown', (event) => {

  if (appState.gameOver) {
    // chars.forEach(charObj => charObj.failures = 0)
    chars= getChars(generatePhrase())
    appState.chars = chars
    appState.currentChar = chars[0].char
    appState.currentCharIndex = 0
    appState.pressedKey = null
    appState.gameOver = false
    clearGame()
    renderPhrase(appState)
    return
  }

  if (event.key === appState.currentChar) {
    appState.currentCharIndex++
    if (appState.currentCharIndex > appState.chars.length - 1) {
      renderScore(appState)
      renderPrompt()
      appState.gameOver = true
      return
    }
    appState.currentChar = chars[appState.currentCharIndex].char
    appState.pressedKey = null
  }
  else {
    appState.pressedKey = event.key
  }

  clearGame()
  renderPhrase(appState)
})
