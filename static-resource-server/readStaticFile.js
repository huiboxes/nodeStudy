const path = require('path')
const mime = require('mime')
const fs = require('fs')

async function readStaticFile(filePathName) {
  const ext = path.parse(filePathName).ext
  const mimeType = mime.getType(ext) || 'text/html'
  let data
  // 判断文件是否存在
  if (fs.existsSync(filePathName)) {
    if (ext) {
      data = await myReadFile(filePathName)
    } else {
      data = await myReadFile(path.join(filePathName, '/index.html'))
    }
  } else {
    data = 'file not found.'
  }

  return {
    mimeType,
    data,
  }
}

function myReadFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        resolve('访问的文件夹中没有index.html')
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = readStaticFile
