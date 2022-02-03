const fs = require('fs')
const path = require('path')

// const dirs = fs.readdirSync('m')
// const dirPaths = dirs.map(dir => path.join('m', dir))

// dirPaths.forEach(path => {
//   const statObj = fs.statSync(path)
//   if (statObj.isFile()) {
//     console.log('文件: ', path);
//     fs.unlinkSync(path)
//   }
//   if (statObj.isDirectory()) {
//     console.log('其他： ', path);
//     fs.rmdirSync(path)
//   }
// })

// console.log(dirPaths);
// fs.rmdirSync('m')




// const rmdirSync = (dir) => {
//   if (fs.statSync(dir).isDirectory()) {
//     let dirs = fs.readdirSync(dir)
//     dirs.map(dird => path.join(dir, dird)).forEach(dirPath => {
//       rmdirSync(dirPath)
//     })
//     fs.rmdirSync(dir)
//   } else {
//     fs.unlinkSync(dir)
//   }
// }

// rmdirSync('m')



const rmdir = (dir, cb) => {
  fs.stat(dir, (err, staObj) => {
    if (staObj.isDirectory()) {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map(dird => path.join(dir, dird))
        let index = 0

        const next = () => {
          if (index === dirs.length) return fs.rmdir(dir, cb)
          let current = dirs[index++]
          rmdir(current, next)
        }
        next()
      })
    } else {
      fs.unlink(dir, cb)
    }
  })
}

rmdir('m', () => {
  console.log('success');
})