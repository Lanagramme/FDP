// read one
//get::/store/user/123123132
read_one =(table, id)=> {
  let _table = require(`${table}.json`)
  return _table.find(x => x.id === id)
}


// read all
//get::/store/user/
read_all =(table)=> {
  return require(`${table}.json`)
}

// create one
//post::/store/users/
//req.body.data
crate_one =(table, data)=>{
  data.id = uuid()
  let _table = read_all(`${table}.json`)
  _table.push(data)
  fs.writeFile(`${table}.json`,data)

  return {create: true}

}

//patch::/store/users/123123
//req.body.data
delete_one =(table, id)=> {
  let _table = read_all(`${table}.json`)
  instance = _table.find(x => x.id === id)
  // supprimer instance de _table
  fs.writeFile(`${table}.json`,data)

  return {delete: true}
}

//delete::/store/users/123123
delete_one =(table, id)=> {
  let _table = read_all(`${table}.json`)
  instance = _table.find(x => x.id === id)
  // supprimer instance de _table
  fs.writeFile(`${table}.json`,data)

  return {delete: true}
}
