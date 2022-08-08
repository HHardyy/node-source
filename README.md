# node-source
在node中require了一个js文件之后做了哪些事呢
```node
node-source
  - index.js
  - module1.js
```
module1.js
```js
module.exports.content = 'hello hardy'
```
index.js
```js
const module1 = require('./module1')
console.log(module1.content)  // hello hardy
```
why ？？？

let's see the code~
