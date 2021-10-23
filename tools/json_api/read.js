function read (file_path, {id}) {
  const table = this.readFileSync(file_path)
  return (id && table.find(item => item.id === id)) || table
}

module.exports = read;