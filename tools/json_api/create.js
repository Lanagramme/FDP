const read = require('./read');
function create (file_path, new_data) {
  const data = read.bind(this)(file_path);
  console.log('data =>',data)
  data.push(new_data)
  this.writeFileSync(file_path, JSON.stringify(data))
  return data;
}

module.exports = create;