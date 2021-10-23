function read (table, {id}={}) {
  return (id && table.find(item => item.id === id)) || table
}

module.exports = read;