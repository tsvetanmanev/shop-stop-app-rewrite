const fs = require('fs')

const database = require('../config/database.js')

module.exports = (req, res) => {
  if (req.path === '/') {
    fs.readFile('./views/home/index.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      let images = database.getAllPublic()
      let resultHtml = ''

      resultHtml += '<ul>'
      for (let i = 0; i < images.length; i++) {
        let image = images[i]
        resultHtml += `
        <li>
          <a href="${image.url}">${image.name}</a>
        </li>
        `
      }
      resultHtml += '</ul>'

      data = data.replace('{{content}}', resultHtml)

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
