const fs = require('fs')
const querystring = require('querystring')
const formidable = require('formidable')

const database = require('../config/database.js')

module.exports = (req, res) => {
  if (req.path === '/image/add' && req.method === 'GET') {
    fs.readFile('./views/images/add.html', (err, data) => {
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
    // let result = ''
    let form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(fields)
      console.log(files)
      let uploadedFile = files['upload']
      let imagePath = '/content/user-images/' + uploadedFile.name
      let imageData = {}
      imageData.name = fields.name
      imageData.url = imagePath
      fs.rename(uploadedFile.path, '.' + imagePath, err => {
        if (err) {
          console.log(err)
          return
        }

        database.add(imageData)
        console.log('Saved!')

        res.writeHead(302, {
          'Location': '/'
        })
        res.end()
      })
    })

    // req.on('data', (data) => { result += data })
    // req.on('end', () => {
    //   console.log(result)
    //   let imageData = querystring.parse(result)
    //   let imageName = imageData.name
    //   let imageUrl = imageData.url

      // if (!imageName || !imageUrl) {
      //   fs.readFile('./build/views/images/upload-error.html', (err, data) => {
      //     if (err) {
      //       console.log(err)
      //       return
      //     }
      //     res.writeHead(200, {
      //       'Content-Type': 'text/html'
      //     })
      //     res.write(data)
      //     res.end()
      //   })
      // } else {
      //   database.add(imageData)
      //   res.writeHead(302, {
      //     'Location': '/'
      //   })
      //   res.end()
      // }
    // })
  } else {
    return true
  }
}
