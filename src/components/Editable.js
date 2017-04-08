var Component = require('./Component')

class Editable extends Component {
  constructor (element, dispatch) {
    super(element)

    function onCopy () {}
    element.onCopy = onCopy

    function onKeyup () {}
    element.onkeyup = onKeyup

    function onPaste () {}
    element.onPaste = onPaste
  }
}

module.exports = Editable
