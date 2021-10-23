const fs = require('fs')
const path = require('path');

// fs.readFileSync()
// fs.writeFileSync()
function JAPI ({action, data, table="character"}) {
  const
    file_path = path.join(__dirname, `../../store/${table}.json`),
    records = table = require(file_path),
    res = require(`./${action}`)(records, data)

  fs.writeFileSync(file_path, JSON.stringify(data))

  return res
}

module.exports = JAPI;