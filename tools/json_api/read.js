function read (file_path, {id}={}) {
  const table = require(file_path)
  return (id && table.find(item => item.id === id)) || table
}

module.exports = read;