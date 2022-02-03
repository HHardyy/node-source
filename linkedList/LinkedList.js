const LinkedNode = require('./LinkedNode')

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  _add(index=0, element) {
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
  _remove(opt) {
    if (opt === 0) {
      let node = this.head
      if (!node) return null
      this.head = node.next
      this.size--
      return node.element
    }
  }
  getNode(index) {
    let current = this.head
    for (let i = 0; i < index; i++) {
      current =  current.next
    }
    return current
  }
  _reverLinkList() {
    const rever = (head) => {
      if (head == null || head.next === null) return head
      let newHead = rever( head.next )
      head.next.next = head
      head.next = null
      return newHead
    }

    this.head = rever(this.head)
    return this.head
  }
  _reverseListTemp() {
    let head = this.head
    if (head === null || head.next === null) return head
    
    let newHead = null

    while (head !== null) {
      let temp = this.head
      head.next = newHead
      newHead = head
      head = temp
    } 
    this.head = newHead
    return this.head
  }
}

module.exports = LinkedList