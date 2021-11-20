function update (table, new_data, _id) {
  const item = table.find(item => item._id.toString() === _id.toString() )
  return item && Object.assign(item, new_data)
}

module.exports = update;