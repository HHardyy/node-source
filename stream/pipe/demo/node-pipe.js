const fs = require('fs')
const path = require('path')

fs.createReadStream(path.resolve(__dirname, 'name.text')).pipe(fs.createWriteStream(path.resolve(__dirname, 'copy-name.text')))