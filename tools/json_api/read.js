function read (table, filters, _id) {
  (_id) && (filters = {_id} )
  const res = table.filter(item => Object.entries(filters).every( ([key, value]) => item[key].toString() === value));
  return Object.keys(filters).length ? (res.length && res || false) : table
}

module.exports = read;