// read one
read_one =(table, id)=> {
  let _table = require(`${table}.json`)
  return _table.find(x => x.id === id)
}


// read all
read_all =(table)=> {
  return require(`${table}.json`)
}

// create one
crate_one =(table, data)=>{
  data.id = uuid()
  let _table = read_all(`${table}.json`)
  _table.push(data)
  fs.writeFile(`${table}.json`,data)

  return {create: true}

}

delete_one =(table, id)=> {
  let _table = read_all(`${table}.json`)
  instance = _table.find(x => x.id === id)
  // supprimer instance de _table
  fs.writeFile(`${table}.json`,data)

  return {delete: true}
}
