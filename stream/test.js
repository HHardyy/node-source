const path = require('path')
const ReadStream = require('./readStream')

const r = new ReadStream(path.resolve(__dirname, 'test.md'), {})

let bufferArry = []
r.on('open', (fd) => {
  console.log('=================open===================');
})

r.on('data', (data) => {
  r.pause() // 暂停
  setTimeout(() => {
    r.resume()
  }, 1000);
  console.log('触发')
  bufferArry.push(data)
  console.log('================data====================', data.toString());
})

r.on('end', () => {
  console.log('=============================end: ', Buffer.concat(bufferArry).toString());
})
r.on('close', () => {
  console.log('close');
})