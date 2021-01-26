const db = require('./db.js')
const inquirer = require('inquirer')
const prompt = require('./prompt.js')

module.exports = {
    async create(words) {
        let list = await db.read()
        list.push({ title: words, done: false })
        await db.write(list)
    },
    async clear() {
        await db.write([])
    },
    async showAll() {
        const list = await db.read()

        let answers = await prompt.printTasks(list)
        let anwsersIndex = Number(answers['task'])


        if (anwsersIndex >= 0) {
            let answser2 = await prompt.askForAction()

            switch (answser2['action']) {
                case 'quit':
                    break;
                case 'markAsDone':
                    list[anwsersIndex].done = true
                    db.write(list)
                    break;
                case 'markAsUnDone':
                    list[anwsersIndex].done = false
                    db.write(list)
                    break;
                case 'remove':
                    list.splice(anwsersIndex, 1)
                    db.write(list)
                    break;
                case 'changeTitle':

                    inquirer.prompt({
                        type: 'input',
                        name: 'title',
                        message: "task name: ",
                        default: list[anwsersIndex].title
                    }).then(answers3 => {
                        list[anwsersIndex].title = answers3.title
                        db.write(list)
                    })
                    break;
                default:
                    break;
            }

        } else if (anwsersIndex === -2) {
            let answers4 = await prompt.createTask()
            list.push({
                title: answers4.title,
                done: false
            })

            db.write(list)
        }
    }
}