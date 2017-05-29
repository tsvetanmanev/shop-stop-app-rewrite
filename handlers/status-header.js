const fs = require('fs')
const database = require('../config/database.js')

module.exports = (req, res) => {
  let statusHeader = req.headers['status-header']
  if (statusHeader && statusHeader === 'Full') {
    fs.readFile('./views/special/status.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      let totalImages = database.getAll().length

      data = data.replace('{{content}}', `<h1>Total images - ${totalImages}</h1>`)

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
