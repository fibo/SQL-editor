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
