function create (records = [], new_item) {
  new_item._id = require('uuid').v1()
  records.push(new_item)
  console.log('records =>',records)
  return new_item || "there no data here! go back to subscribe!! peuh!!!! ";
}

module.exports = create;