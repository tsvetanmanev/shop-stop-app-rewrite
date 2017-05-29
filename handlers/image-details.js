const fs = require('fs')

const database = require('../config/database.js')

module.exports = (req, res) => {
  let urlParams = req.path.split('/')


  if (urlParams[1] === 'images' &&
    urlParams[2] === 'details' &&
    req.method === 'GET') {
    let imageId = urlParams[3]
    let image = database.get(imageId)

    if (image) {
      fs.readFile('./views/images/details.html', 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        let imageDetailsHtml = `
        <h2>${image.name}</h2>
        <img src="${image.url}">`
        data = data.replace('{{content}}', imageDetailsHtml)

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)
        res.end()
      })
    } else {
      return true
    }
  } else {
    return true
  }
}
