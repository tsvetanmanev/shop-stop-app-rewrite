const fs = require('fs')
const querystring = require('querystring')

const database = require('../config/database.js')

module.exports = (req, res) => {
  if (req.path === '/image/add' && req.method === 'GET') {
    fs.readFile('./build/views/images/add.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else if (req.path === '/image/add' && req.method === 'POST') {
    let result = ''

    req.on('data', (data) => { result += data })
    req.on('end', () => {
      let imageData = querystring.parse(result)
      let imageName = imageData.name
      let imageUrl = imageData.url

      if (!imageName || !imageUrl) {
        fs.readFile('./build/views/images/upload-error.html', (err, data) => {
          if (err) {
            console.log(err)
            return
          }
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.write(data)
          res.end()
        })
      } else {
        database.add(imageData)
        res.writeHead(302, {
          'Location': '/'
        })
        res.end()
      }
    })
  } else {
    return true
  }
}
