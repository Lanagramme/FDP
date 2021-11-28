const fs = require('fs')

module.exports = ([table, id], data, action) => {
  const
    file_path = __dirname+`/../../store/${table}.json`,
    records = ( fs.existsSync(file_path) && JSON.parse(fs.readFileSync(file_path, 'utf8')) ) || [],
    res = records && require(`./${action}`)(records, data, id) || 'NOT FOUND';

  console.log('res =>', res)
  action !== "read" && fs.writeFileSync(file_path, JSON.stringify(records))

  return res
};