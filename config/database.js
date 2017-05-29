const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '/database.json')

let data = []

function save (data) {
  let jsonData = JSON.stringify(data)
  fs.writeFileSync(dbPath, jsonData)
}

let add = (image) => {
  data.push(image)
  save(data)
}

let getAll = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]')
    return []
  }

  let jsonData = fs.readFileSync(dbPath).toString() || '[]'
  data = JSON.parse(jsonData)
  return data.slice(0)
}

let get = (idString) => {
  let id = Number(idString)
  let array = getAll()
  return array[id]
}

module.exports = {
  add: add,
  get: get,
  getAll: getAll
}
