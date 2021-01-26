const inquirer = require("inquirer")

module.exports = {
    printTasks(list) {

        return new Promise((resolve, reject) => {
            inquirer
                .prompt([{
                    type: 'list', // prompt类型
                    name: 'task', // key
                    message: 'please select a task', // 提示消息
                    choices: (function() {
                        let newList = list.map((value, index, arr) => {
                            return {
                                name: `${value.done? '[x]' : '[_]'} ${index+1} - ${value.title}`,
                                value: index
                            }
                        })

                        newList.unshift({
                            name: 'quit',
                            value: '-1'
                        })
                        newList.push({
                            name: '+ create a task',
                            value: '-2'
                        })

                        return newList // 最后返回list数组
                    })
                }])
                .then(answers => {
                    resolve(answers) // 用户选择的Tasks项目
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    askForAction() {

        return new Promise((resolve, reject) => {
            inquirer
                .prompt([{
                    type: 'list', // prompt类型
                    name: 'action', // key
                    message: 'please select operate', // 提示消息
                    choices: [
                        { name: 'quit', value: 'quit' },
                        { name: 'done', value: 'markAsDone' },
                        { name: 'not done', value: 'markAsUnDone' },
                        { name: 'delete', value: 'remove' },
                        { name: 'change task title', value: 'changeTitle' },
                    ]
                }])
                .then((answser2) => {
                    resolve(answser2)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    createTask() {
        return new Promise((resolve, reject) => {
            // 创建任务
            inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: "add task title name: "
                })
                .then(answers4 => {
                    resolve(answers4)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}