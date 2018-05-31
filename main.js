var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'

var chars = phrase.split('').map((char, i)=> {
  return {char}
})

function renderChar(charObj) {
  var $char = document.createElement('span')
  $char.textContent = charObj.char
  return $char
}

function renderAllChars(chars) {
  chars.forEach(charObj => {
    document.body.appendChild(renderChar(charObj))
  })
}

renderAllChars(chars)
