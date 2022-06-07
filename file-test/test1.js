const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data.toString())
// })
const content = '这是新写入的内容\n'
const opt = {
  flag: 'w', // 追加写入，覆盖用'w'
}
// fs.writeFile(fileName, content, opt, () => {})
// fs.appendFile(fileName, content,(err, data) => {})
// fs.exists(fileName, (exist) => {
//   console.log('exist', exist)
// })
// const exists = fs.existsSync(fileName)
// if (exists) {
//   console.log('文件存在')
// }
