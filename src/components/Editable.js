var Component = require('./Component')
var TABKEY = 9

class Editable extends Component {
  constructor (element, dispatch) {
    super(element)

    function oncopy () {}
    element.oncopy = oncopy

    function onkeydown (event) {
      var keyCode = event.keyCode

//      console.log(event.keyCode)

      // Prevent TABKEY to exit from content editable area.
      if (keyCode === TABKEY) {
        event.preventDefault()
      }
    }
    element.onkeydown = onkeydown

    function onpaste () {}
    element.onpaste = onpaste
  }
}

module.exports = Editable
