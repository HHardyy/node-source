const LinkedList = require('./LinkedList')

let ll = new LinkedList()

// ll._add(0, 1)
// ll._add(0, 2)
// ll._add(3)

// console.dir(ll, { depth: 1000 })

ll._add(1)
ll._add(2)
ll._add(3)

console.dir(ll._reverLinkList())