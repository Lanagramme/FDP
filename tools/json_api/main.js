const fs = require('fs')
// fs.readFileSync()
// fs.writeFileSync()
function JAPI ({action, data, table}) {
  return require(`./${action}`).bind(fs)(`../../store/${table}`, data)
}

module.exports = JAPI;