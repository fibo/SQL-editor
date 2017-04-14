(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./components/Root":4,"./getInitialState":5,"./reducer":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var Component = require('./Component')

class Editable extends Component {
  constructor (element, dispatch) {
    super(element)

    function onCopy () {}
    element.onCopy = onCopy

    function onKeyup (event) {
      console.log(event)
    }

    console.log(element)
    element.onkeyup = onKeyup

    function onPaste () {}
    element.onPaste = onPaste
  }
}

module.exports = Editable

},{"./Component":2}],4:[function(require,module,exports){
var Component = require('./Component')

var Editable = require('./Editable')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    this.component.Editable = new Editable(element.querySelector('div[contenteditable=true]'), dispatch)
  }
}

module.exports = Root

},{"./Component":2,"./Editable":3}],5:[function(require,module,exports){
function getInitialState () {
  return {}
}

module.exports = getInitialState

},{}],6:[function(require,module,exports){
var app = require('./app')
console.log('ok')
window.addEventListener('load', app())

},{"./app":1}],7:[function(require,module,exports){
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

},{}]},{},[6]);
