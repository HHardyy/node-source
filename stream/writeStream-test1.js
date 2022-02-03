const path = require('path')
const WriteStream = require('./WriteStream')

const ws = new WriteStream(path.resolve(__dirname, 'test1.txt'), {
  flags: 'w',
  encoding: 'utf-8',
  mode: 0x666,
  autoClose: true,
  start: 0,
  highWaterMark: 3   // 预期占用内存， 16 =  16 * 1024 = 16k （指代的不是每次写入多少） 不会影响内容写入
})

let index = 0
const write = () => {
  let flag = true
  while (flag && index < 10) {
    flag = ws.write(''+ index)
    index++
  }
  if (index == 10) {
    // ws.end('!!')
  }
}
write()

ws.on('drain', () => {
  console.log('drain');
  write()
})
ws.on('close', () => {
  console.log('close');
})