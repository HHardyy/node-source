const EventEmitter = require('./events')
const utils = require('util')

function Person() { }

// Person.prototype.__proto__ = EventEmitter.prototype
// utils.inherits(Person, EventEmitter)
Object.setPrototypeOf(Person.prototype, EventEmitter.prototype)

const person = new Person()

person.on('newListener', (type) => {
  if (type === 'weekend') {
    process.nextTick(() => {
      person.emit(type, '*****')
    })
  }
})

const sleep = (w) => console.log(w, 'sleep')
const eat = (w) => console.log(w, 'eat')

// person.on('weekend', sleep)
// person.on('weekend', eat)

person.once('weekend', sleep)
person.once('weekend', eat)

// person.off('weekend', sleep)

// person.emit('weekend', 'hardy')
// person.emit('weekend', 'hardy')
// person.emit('weekend', 'hardy')