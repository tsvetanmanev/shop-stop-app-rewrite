// const fs = require('fs')

// const dataFilePath = 'storage.dat'

let data = []

let add = (image) => {
  data.push(image)
}

let getAll = () => {
  return data.slice(0)
}

let get = (idString) => {
  let id = Number(idString)
  let array = getAll()
  return array[id]
}

// let get = (id) => {
//   return data[id]
// }


module.exports = {
  add: add,
  get: get,
  getAll: getAll
  // get: get,
  // save: save,
  // load: load
}
