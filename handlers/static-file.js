const fs = require('fs')

let getContentType = (url) => {
  let contentType = 'forbidden'

  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.html')) {
    contentType = 'text/html'
  } else if ((url.endsWith('.jpg') || url.endsWith('.jpeg'))) {
    contentType = 'image/jpeg'
  }

  return contentType
}

module.exports = (req, res) => {
  fs.readFile('.' + req.path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('404 resource not found! Check your URL')
      res.end()
      return
    } else if (!(req.path.startsWith('/content')) || getContentType(req.path) === 'forbidden') {
      res.writeHead(403)
      res.write('403 Access forbidden')
      res.end()
      return
    }

    res.writeHead(200, {
      'Content-Type': getContentType(req.path)
    })
    res.write(data)
    res.end()
  })
}
