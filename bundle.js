(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  "INTEGER",
  "VARCHAR"
]

},{}],2:[function(require,module,exports){
module.exports=[
  "COUNT", "MAX", "MIN", "AVG", "SUM"
]

},{}],3:[function(require,module,exports){
module.exports=[
  "DATABASE", "USER", "GRANT", "TABLE", "VIEW",
  "INSERT", "DROP", "DELETE", "UPDATE", "TRUNCATE",
  "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY",
  "LIMIT", "OFFSET",
  "CREATE TABLE", "CREATE VIEW",
  "EXPLAIN", "AS", "SET"
]

},{}],4:[function(require,module,exports){
module.exports=["AND", "OR"]

},{}],5:[function(require,module,exports){
var Root = require('./components/Root')
var getInitialState = require('./getInitialState')
var reducer = require('./reducer')

/**
 * App loader.
 *
 * window.addEventListener('load', app(state))
 */

function app (initialState) {
  return function () {
    var currentState = initialState || getInitialState()

    var render = Function.prototype

    function dispatch (action) {
      currentState = reducer(currentState, action)
      render(currentState)
    }

    var root = new Root(document, dispatch) // or use any other DOM element

    render = root.render.bind(root)
    render(currentState)
  }
}

module.exports = app

},{"./components/Root":8,"./getInitialState":10,"./reducer":12}],6:[function(require,module,exports){
class Component {
  constructor (element, dispatch) {
    this.element = element
    this.dispatch = dispatch

    this.component = {}
  }

  render (state) {
    var component = this.component

    Object.keys(component).forEach(function (key) {
      component[key].render(state)
    })
  }
}

module.exports = Component

},{}],7:[function(require,module,exports){
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

},{"./Component":6,"sql92-json/src/dataTypes.json":1,"sql92-json/src/functions.json":2,"sql92-json/src/keywords.json":3,"sql92-json/src/logicalOperators.json":4}],8:[function(require,module,exports){
var Component = require('./Component')

var SQLEditor = require('./SQLEditor')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    this.component.SQLEditor = new SQLEditor(element.querySelector('.sql-editor'), dispatch)
  }
}

module.exports = Root

},{"./Component":6,"./SQLEditor":9}],9:[function(require,module,exports){
var Component = require('./Component')

var Editable = require('./Editable')

var bannerWidth = 300

class SQLEditor extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    function resize () {
      var padding = 5
      var width = window.innerWidth - bannerWidth - 2 * padding
      element.style.width = width + 'px'
    }

    resize()

    window.addEventListener('resize', resize)

    this.component.Editable = new Editable(element.querySelector('div[contenteditable=true]'), dispatch)
  }
}

module.exports = SQLEditor

},{"./Component":6,"./Editable":7}],10:[function(require,module,exports){
function getInitialState () {
  return {}
}

module.exports = getInitialState

},{}],11:[function(require,module,exports){
var app = require('./app')
window.addEventListener('load', app())

},{"./app":5}],12:[function(require,module,exports){
// var sql = require('sql92-json')

function reducer (currenState, action) {
  var state = Object.assign(currenState)

  switch (action.type) {
    case 'SQL_UPDATED':
      // TODO try sql.parse(content)

      break
  }

  return state
}

module.exports = reducer

},{}]},{},[11]);
