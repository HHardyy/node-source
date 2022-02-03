const EventEmitter = require('events')
const fs = require('fs')

class ReadStream extends EventEmitter {
  constructor(path, opts = {}) {
    super()
    this.path = path
    this.flags = opts.flags || 'r'
    this.mode = opts.mode || 0o66
    this.autoClose = opts.autoClose || true
    this.start = opts.start || 0
    this.end = opts.end
    // 如果大于64k，就采用流的形式
    this.heighWaterMark = opts.heighWaterMark || 64 * 1024
    // 读取的偏移量
    this.pos = this.start
    this.flowing = false

    this.open()
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    const buffer = Buffer.alloc(this.heighWaterMark)
    let readOffet = this.end ? Math.min(this.end - this.pos + 1, this.heighWaterMark) : this.heighWaterMark
    fs.read(this.fd, buffer, 0, readOffet, this.pos, (err, byteReadeds) => {
      if (byteReadeds) {
        this.pos += byteReadeds
        this.emit('data', buffer)
        if (this.flowing = true) {
          this.read()
        }
      } else {
        this.emit('end')
        if (this.autoClose) {
          fs.close(this.fd, () => {
            this.emit('close')
          })
        }
      }
    })
  }
  pause() {
    this.flowing = false
  }
  resume() {
    this.flowing = true
    this.read()
  }
  pipe(dest) {
    this.on('data', (data) => {
      let flag = dest.write(data)
      if (!flag) {
        this.pause()
      }
    })
    dest.on('drain', () => {
      this.resume()
    })
    // this.on('end', () => {
    //   dest.end()
    // })
  }
}

module.exports = ReadStream