function create (data, new_data) {
  new_data._id = (new Date()).valueOf()
  console.log('data =>',data)
  data.push(new_data)
  return new_data || "there no data here! go back to subscribe!! peuh!!!! ";
}

module.exports = create;