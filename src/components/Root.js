import React, { Component } from 'react'
// import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/sql'
import 'brace/theme/github'

function onChange (newValue) {
  console.log('change', newValue)
}

class Root extends Component {
  render () {
    return (
      <AceEditor
        mode='sql'
        theme='github'
        onChange={onChange}
        editorProps={{$blockScrolling: true}}
      />
    )
  }
}

module.exports = Root
