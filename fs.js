var fs = require('fs');

const 
  write_in = (data, filename) => {
    data = JSON.stringify(data)
    file = `${filename}.json`
    fs.writeFile(file, data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    }); 
  },
  read = (filename) => {
    try { data = require(`./${filename}.json`); } 
    catch (error) { data = [] }
    return data;
  },
  add_data = (data, filename) => {
    local_data = read(filename)
    write_in(local_data.push(data), filename)
  },
  find_data_by = (data, filter, filename) => {
    local_data = read(filename)
    return local_data.filter(x => x[filter]=== data)
  },
  delete_data_by = (data, filter, filename) => {
    local_data = read(filename)
    write_in(local_data.filter(x => x[filter]!== data), filename)
  }

// add_data({id: 2},'save')
// console.log(read('save'))
// console.log(find_data_by(2, 'id', "save"))
delete_data_by(3, "id", "save")

