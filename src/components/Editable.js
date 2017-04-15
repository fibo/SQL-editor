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

    function onpaste (event) {
      event.preventDefault()

      var clipboardData = event.clipboardData || window.clipboardData
      var pastedData = clipboardData.getData('Text')

      // TODO see how to get cursor position
      // http://stackoverflow.com/a/4770562/1217468
      element.innerHTML = element.innerHTML + pastedData
    }

    element.onpaste = onpaste
  }
}

module.exports = Editable
