const fs = require('fs')
const EventEmitter = require('events')
const LinkedList = require('../linkedList/LinkedList')

class Queue {
  constructor() {
    this.LinkedList = new LinkedList()
  }
  offer(element) {
    this.LinkedList._add(element)
  }
  poll() {
    return this.LinkedList._remove(0)
  }
}

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.encoding = options.encoding || 'utf-8'
    this.mode = options.mode || 0x666
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.highWaterMark = options.highWaterMark || 16 * 1024
    
    this.len = 0
    this.writing = false
    this.needDrain = false
    this.offset = this.start
    this.cache = new Queue()
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      // if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding = 'utf-8', cb = () => { }) {
    //  可以是string or buffer 会转成buffer统一操作
    chunk === Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.len += chunk.length
    
    let flag = this.len < this.highWaterMark

    this.needDrain = !flag

    if (this.writing) {
      this.cache.offer({chunk, encoding, cb})
    } else {
      this.writing = true
      this._write(chunk, encoding, () => {
        cb()
        this.clearBuffer()
      })
    }

    return flag
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    // fs.write(this.fd, chunk, 0, chu nk.length, this.offset, (err, written, buffer) => {
    //   console.log('=====', written);
    //   this.len -= written
    //   this.offset += written
    //   cb()
    // })
    fs.write(this.fd, chunk, (err, written, buffer) => {
      this.len -= written
      this.offset += written
      cb()
    })
  }
  clearBuffer() {
    let data = this.cache.poll()
    if (data) {
      let { chunk, encoding, cb } = data
      this._write(chunk, encoding, () => {
        cb()
        this.clearBuffer()
      })
    } else {
      this.writing = false
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

module.exports = WriteStream 