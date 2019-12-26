const alias = 'c';
const desc = 'Complete or pending task';

const completeTrue = {
    default: true,
    alias,
    desc
}

const completeUndefined = {
    default: undefined,
    alias,
    desc
}

const description = {
    demand: true,
    alias: 'd',
    desc: 'Task description'
}

const argv = require('yargs')
    .command('create', 'Create task', { description })
    .command('read', 'Read task', { completeUndefined })
    .command('update', 'Update task', { description, completeTrue })
    .command('delete', 'Delete task', { description })
    .help()
    .argv;

module.exports = { argv };