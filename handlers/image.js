const fs = require('fs')
const querystring = require('querystring')
const formidable = require('formidable')
const shortid = require('shortid')

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
      let uploadedFile = files['upload']

      let imageIdinDatabase = database.getNextId() // database.add(imageData)
      let imageFolderNumber = (imageIdinDatabase % 1000)

      let imageExtension = uploadedFile.type.split('/').pop()
      let imageGeneratedName = shortid.generate() + '.' + imageExtension

      let imageDir = `/content/user-images/${imageFolderNumber}`
      let imagePath = `${imageDir}/${imageGeneratedName}`

      let imageData = {}
      imageData.name = fields.name
      imageData.isPrivate = fields.private
      imageData.url = imagePath

      let imageDirOnServer = '.' + imageDir

      if (!fs.existsSync(imageDirOnServer)) {
        fs.mkdirSync(imageDirOnServer)
      }

      let imagePathOnServer = '.' + imagePath
      fs.rename(uploadedFile.path, imagePathOnServer, err => {
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
