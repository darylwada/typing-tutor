var phrase = 'grumpy wizards make toxic brew for the evil queen and jack'

var chars = phrase.split('').map( (char, i) => {
  return { char }
})

function renderChar(char) {
  var $char = document.createElement('span')
  $char.textContent = char
  return $char
}
