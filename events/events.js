class EventEmitter {
  constructor() {
    this._events = {}
  }
  on(event, cb) {
    if (!this._events) this._events = {}

    if (event !== 'newListener') {
      this.emit('newListener', event)
    }

    if (!this._events[event]) this._events[event] = []
    this._events[event].push(cb)
  }
  emit(event, ...args) {
    if (this._events && this._events[event]) {
      this._events[event].forEach(cb => {
        cb(...args)
      });
    }
  }
  off(event, callback) {
    if (this._events && this._events[event]) {
      this._events[event] = this._events[event].filter(cb => (cb !== callback) && (cb.l !== callback))
    }
  }
  once(event, callback) {
    const once = (...args) => {
      callback(...args)
      this.off(event, once)
    }
    once.l = callback
    this.on(event, once)
  }
}

module.exports = EventEmitter