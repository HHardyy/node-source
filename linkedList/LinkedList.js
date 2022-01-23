const LinkedNode = require('./LinkedNode')

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  _add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }
 
    if (index < 0 || index > this.size) throw new Error('越界')
    if (index === 0) {
      let head = this.head
      this.head = new LinkedNode(element, head)
    } else {
      let preNode = this.getNode(index - 1)
      preNode.next = new LinkedNode(element, preNode.next)
    }
    this.size ++
  }
  _get() { }
  _remove() { }
  getNode(index) {
    let current = this.head
    for (let i = 0; i < index; i++) {
      current =  current.next
    }
    return current
  }
}

let ll = new LinkedList()

ll._add(0, 1)
ll._add(0, 2)
ll._add(3)

console.dir(ll, { depth: 1000 })