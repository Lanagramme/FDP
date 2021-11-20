function read (table, filters, _id) {
  (_id) && (filters = {_id} )
  return Object.keys(filters).length ? (table.filter(item => Object.entries(filters).every( ([key, value]) => item[key].toString() === value)) || false) : table
}

module.exports = read;