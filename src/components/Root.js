var Component = require('./Component')

var Editable = require('./Editable')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    this.component.Editable = new Editable(element.querySelector('div[contenteditable=true]'), dispatch)
  }
}

module.exports = Root
