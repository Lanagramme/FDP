const fs = require('fs')
const path = require('path');

// fs.readFileSync()
// fs.writeFileSync()
function JAPI ({action, data, table="character"}) {
  return require(`./${action}`).bind(fs)(path.join(__dirname, `../../store/${table}.json`), data)
}

module.exports = JAPI;