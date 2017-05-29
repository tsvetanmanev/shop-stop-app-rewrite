const homePageHandler = require('./homepage')
const faviconHandler = require('./favicon')
const staticFileHandler = require('./static-file')
const imageHandler = require('./image')
const imageDetailsHandler = require('./image-details')
const statusHeaderHandler = require('./status-header')

module.exports = [
  statusHeaderHandler,
  homePageHandler,
  faviconHandler,
  imageHandler,
  imageDetailsHandler,
  staticFileHandler
]
