#!/usr/bin/env node

const program = require('commander');
const api = require('./index.js')

// program
//     .option('-x, --xxx', 'whta is xxx')


// get user input
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0, -1).join('')

        api.create(words)
            .then(() => {
                console.log('add succeess')
            })
            .catch(() => {
                console.log('add failed')
            })
    });
// remove all task
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {

        api.clear()
            .then(() => {
                console.log('remove success')
            })
            .catch(() => {
                console.log('remove failed')
            })
    });


program.parse(process.argv) // parse user input params

// 不传入命令 展示全部事项
if (process.argv.length === 2) {
    api.showAll()
}