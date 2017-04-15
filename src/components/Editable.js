var dataTypes = require('sql92-json/src/dataTypes.json')
var functions = require('sql92-json/src/functions.json')
var keywords = require('sql92-json/src/keywords.json')
var logicalOperators = require('sql92-json/src/logicalOperators.json')

var Component = require('./Component')
var TABKEY = 9

class Editable extends Component {
  constructor (element, dispatch) {
    super(element)

    function upperCaseKeywords () {
      var innerHTML = element.innerHTML

      dataTypes
      .concat(keywords)
      .concat(logicalOperators)
      .forEach(function (keyword) {
        var regExp1 = new RegExp('^' + keyword, 'i')
        innerHTML = innerHTML.replace(regExp1, keyword)

        var regExp2 = new RegExp(' ' + keyword + ' ', 'i')
        innerHTML = innerHTML.replace(regExp2, ' ' + keyword + ' ')

        var regExp3 = new RegExp('>' + keyword + ' ', 'i')
        innerHTML = innerHTML.replace(regExp3, '>' + keyword + ' ')

        var regExp5 = new RegExp(' ' + keyword + '<', 'i')
        innerHTML = innerHTML.replace(regExp5, ' ' + keyword + '<')

        var regExp6 = new RegExp('>' + keyword + '<', 'i')
        innerHTML = innerHTML.replace(regExp6, '>' + keyword + '<')

        var regExp7 = new RegExp('>' + keyword + '&nbsp;', 'i')
        innerHTML = innerHTML.replace(regExp7, '>' + keyword + '&nbsp;')

        var regExp8 = new RegExp(' ' + keyword + '&nbsp;', 'i')
        innerHTML = innerHTML.replace(regExp8, ' ' + keyword + '&nbsp;')
      })

      functions.forEach(function (keyword) {
        var regExp1 = new RegExp(keyword + '\\(', 'i')
        innerHTML = innerHTML.replace(regExp1, keyword + '(')
      })

      element.innerHTML = innerHTML

      // Set caret to the end of text.
      // http://stackoverflow.com/a/4238971/1217468
      var range = document.createRange()
      var selection = window.getSelection()

      range.selectNodeContents(element)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    function oncopy () {}

    function onkeydown (event) {
      var keyCode = event.keyCode

      // Prevent TABKEY to exit from content editable area.
      if (keyCode === TABKEY) event.preventDefault()
    }

    function onkeyup (event) {
      var code = event.code

      if (['Enter', 'Space'].indexOf(code) > -1) upperCaseKeywords()
    }

    function onpaste (event) {
      event.preventDefault()

      var clipboardData = event.clipboardData || window.clipboardData
      var pastedData = clipboardData.getData('Text')

      // TODO see how to get cursor position
      // http://stackoverflow.com/a/4770562/1217468
      element.innerHTML = element.innerHTML + pastedData
    }

    element.oncopy = oncopy
    element.onkeydown = onkeydown
    element.onkeyup = onkeyup
    element.onpaste = onpaste
  }
}

module.exports = Editable
