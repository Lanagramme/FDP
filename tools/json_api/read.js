function read (table, filters={}) {
  return Object.keys(filters).length ? (table.find(item => Object.entries(filters).every( ([key, value]) => item[key] === value)) || false) : table
}

module.exports = read;