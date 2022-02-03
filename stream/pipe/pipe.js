/**
 * demo 的实现
*/

const path = require('path')

const ReadStream = require('../ReadStream')
const WriteStream = require('../WriteStream')

let rs = new ReadStream(path.resolve(__dirname, 'name.text'), { heighWaterMark: 4 })
let ws = new WriteStream(path.resolve(__dirname, 'copy-name.text'), { heighWaterMark: 1 })


// 实现原理
// rs.on('data', (data) => {
//   let flag = ws.write(data)
//   if (!flag) {
//     rs.pause();
//   }
// })

// ws.on('drain', () => {
//   rs.resume()
// })


// 实际使用
rs.pipe(ws)
