var people = ['Ron', 'Tim', 'Daryl', 'Jerome', 'Arthur', 'Taylor', 'Jeff', 'Franz', 'JJ']
var verbs = ['poked', 'destroyed', 'created', 'kicked', 'threw', 'punched', 'fought', 'laughed at', 'ran away from']
var articles = ['my', 'your', 'the', 'a', 'his', 'that', 'her']
var adjectives = ['grumpy', 'polite', 'stupid', 'crazy', 'huge', 'tiny', 'obnoxious', 'friendly', 'ugly', 'old']
var nouns = ['cat', 'potato', 'puppy', 'refrigerator', 'llama', 'computer', 'idiot', 'airplane'];

var jsPhrases = [
  'function foo() {\n  console.log(bar)\n}',
  'const foo = () => {\n  console.log(bar)\n}',
  'for (var i = 0; i < foo.length; i++) {\n  console.log(bar)\n}',
  'foo.filter((element) => {\n  return element > bar\n})',
  'var foo = {\n  bar: a,\n  baz: b\n}'
]

function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function generatePhrase(language) {
  if (language === 'english') {
    return [ people[randomIndex(people)], verbs[randomIndex(verbs)], articles[randomIndex(articles)]
           , adjectives[randomIndex(adjectives)], nouns[randomIndex(nouns)] ].join(' ')
  }
  else if (language === 'javascript') {
    return jsPhrases[randomIndex(jsPhrases)]
  }

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

var chars = getChars(generatePhrase('english'))

var appState = {
  chars: chars,
  currentChar: chars[0].char,
  currentCharIndex: 0,
  pressedKey: null,
  gameOver: false,
  language: 'english'
}

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char

  if (appState.language === 'javascript') {
    $char.classList.add('mono')
    if (charObj.char === '\n') {
      $char.textContent = '↵'
    }
    if (charObj.char === ' ' ) {
      $char.innerHTML = '&nbsp;'
    }
  }

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
  var $phraseLines = {}
  $phraseLines[0] = document.createElement('div')
  $phraseLines[0].classList.add('phrase')

  if (appState.language === 'javascript') {
    $phraseLines[0].classList.add('code-phrase')
  }

  var i = 0
  appState.chars.forEach(charObj => {
    if (charObj.char === '\n') {
      $phraseLines[i].appendChild(renderChar(charObj))
      document.body.appendChild($phraseLines[i])
      i++
      $phraseLines[i] = document.createElement('div')
      $phraseLines[i].classList.add('phrase')
      $phraseLines[i].classList.add('code-phrase')
    }
    else {
      $phraseLines[i].appendChild(renderChar(charObj))
    }
  })

  document.body.appendChild($phraseLines[i])
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
  var gameElements = Array.from(document.body.children).slice(4)
  gameElements.forEach(element => element.remove())
}

function resetGame(appState) {
  chars = getChars(generatePhrase(appState.language))
  appState.chars = chars
  appState.currentChar = chars[0].char
  appState.currentCharIndex = 0
  appState.pressedKey = null
  appState.gameOver = false
  clearGame()
  renderPhrase(appState)
}

renderPhrase(appState)

window.addEventListener('keydown', (event) => {

  if (event.key === 'Shift') {
    return
  }

  if (appState.gameOver) {
    resetGame(appState)
    return
  }

  if (event.key === appState.currentChar
      || event.key === 'Enter' && appState.currentChar.charCodeAt() === 10) {
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
  console.log(appState);
  clearGame()
  renderPhrase(appState)
})

var $radioBtns = document.querySelectorAll('input')
$radioBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    appState.language = event.target.value
    chars = getChars(generatePhrase(appState.language))
    resetGame(appState)
    clearGame()
    renderPhrase(appState)
  })
})
