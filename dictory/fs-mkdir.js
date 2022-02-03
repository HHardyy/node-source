const fs = require('fs')
const path = require('path')

// fs.mkdirSync('a/b')

// const mkdirSync = (paths) => {
//   let _arr = paths.split('/')
//   _arr.forEach((path, index) => {
//     let _currentPath = _arr.slice(0, index + 1).join('/')
//     console.log(_currentPath);
//     if (!fs.existsSync(_currentPath)) {
//       fs.mkdirSync(_currentPath)
//     }
//   });
// }
// mkdirSync('a/b/c/d/e/f')



const mkdir = (paths, cb) => {
  const _arr = paths.split('/')
  let index = 0
  const next = (err) => {
    if(err) return cb(err)
    if (index===_arr.length) return cb()
    let _currentPath = _arr.slice(0, ++index).join('/')
    fs.access(_currentPath, (err) => {
      if (err) fs.mkdir(_currentPath, next)
      else next()
    })
  }
  next()
}


mkdir('a/b/c/d/e/f', (err) => {
  console.log(err ? err : 'success');
})
