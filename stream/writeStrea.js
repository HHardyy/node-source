const fs = require('fs')
const path = require('path')

const ws = fs.createWriteStream(path.resolve(__dirname, 'test-wt'), {
  highWaterMark: 3
})

let index = 0
const write = () => {
  let flag = true
  while (flag && index < 10) {
    flag = ws.write(index + '')
    console.log("flag：", flag);
    index++
  }
  if (index == 10) {
    ws.end('!!')
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