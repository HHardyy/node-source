const fs = require('fs')
const path = require('path')

const ws = fs.createWriteStream(path.resolve(__dirname, 'test-w.md'), {
  flags: 'w',
  encoding: 'utf-8',
  mode: 0x666,
  autoClose: true,
  start: 0, 
  highWaterMark: 3   // 预期占用内存， 16 =  16 * 1024 = 16k （指代的不是每次写入多少） 不会影响内容写入
})

ws.write('hello', () => {
  console.log('success');
})

ws.write('word', () => {
  console.log('success');
})


ws.end('!!!', () => {
  console.log('end');
})