const path = require('path')
const fs = require('fs')
const vm = require('vm')

const _require = (filePath) => Module._load(filePath)

class Module {
  constructor(id) {
    this.id = id
    this.exports = {}
  }
  static _extensions = {
    '.js': (module) => {
      let scrtptText = fs.readFileSync(module.id, 'utf-8')
      let fnStr = module._warp(scrtptText)
      let fn = vm.runInThisContext(fnStr)

      let exports = module.exports
      let require = _require
      let _filename = module.id
      let _dirname = path.dirname(module.id)
      fn.call(exports, exports, require, module, _filename, _dirname)
    },
    '.json': (module) => {
      let text = fs.readFileSync(module.id)
      module.exports = JSON.parse(text)
    }
  }
  static _resolveFilename(filePath) {
    const _fpath = path.resolve(__dirname, filePath)
    const _exists = fs.existsSync(_fpath)
    if (_exists) return _fpath

    const _extensionKeys = Object.keys(this._extensions)
    for (let i = 0; i < _extensionKeys.length; i++) {
      let currentFilePath = filePath + _extensionKeys[i]
      if (fs.existsSync(currentFilePath)) return currentFilePath
    }

    throw new Error('module can not find')
  }
  static _catch() { }
  static _load(filePath) {
    const _abspath = this._resolveFilename(filePath)

    const _preCacheModule = this._catch[_abspath]
    if (_preCacheModule) {
      return _preCacheModule.exports
    }

    let module = new this(_abspath)
    this._catch[_abspath] = module
    module.load(_abspath)
    return module.exports
  }
  load(absPath) {
    const extName = path.extname(absPath)
    this.constructor._extensions[extName](this)
  }
  _warp(scriptText) {
    let arr = [
      '(function(exports, require, module, __filename, __dirname) {',
      scriptText,
      '})'
    ]
    return arr.join('')
  }
}

// const module1 = require('./module1')
// console.log(module1.content)
const module1 = _require('./module1')
console.log(module1)

// 多次引入重复调用
_require('./module1')
_require('./module1')
_require('./module1')
_require('./module1')
