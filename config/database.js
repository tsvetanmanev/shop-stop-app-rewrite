const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '/database.json')

let data = []

function save (data) {
  let jsonData = JSON.stringify(data)
  fs.writeFileSync(dbPath, jsonData)
}

function load () {
  let jsonData = fs.readFileSync(dbPath)
  data = JSON.parse(jsonData)
}

let add = (image) => {
  load()
  data.push(image)
  save(data)

  let idOfSavedImage = data.length
  return idOfSavedImage
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

let getNextId = () => {
  let nextId = getAll().length
  return nextId
}

module.exports = {
  add: add,
  get: get,
  getAll: getAll,
  getNextId: getNextId
}
