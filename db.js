const homedir = require('os').homedir();
const fs = require('fs')
const path = require('path')
const dbPath = path.join(homedir, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding: 'utf-8', flag: 'a+' }, (error, data) => { // a+模式： 读取该文件，不存在则创建该文件
                if (error) {
                    return reject(error)
                }

                let list;
                try { // 不是array，也强制赋值为array
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const taskString = JSON.stringify(list) + '\r\n'

            fs.writeFile(path, taskString, (err) => {
                if (err) {
                    return reject(err)
                }

                resolve()
            })
        })
    }
}

module.exports = db