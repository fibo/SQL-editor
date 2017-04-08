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
