var Component = require('./Component')

var SQLEditor = require('./SQLEditor')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    this.component.SQLEditor = new SQLEditor(element.querySelector('.sql-editor'), dispatch)
  }
}

module.exports = Root
