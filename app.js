const colors = require('colors');
const argv = require('./config/yargs').argv;
const toDo = require('./to-do/to-do');
const isBoolean = obj => typeof obj === 'boolean' || obj === 'false' || obj === 'true';
const isString = obj => typeof obj === 'string' && obj.trim().length > 0;
const isUndefined = obj => typeof obj === 'undefined';
const toBoolean = obj => { if (isBoolean(obj)) return JSON.parse(obj) };

switch (argv._[0]) {
    case 'create':
        if (!isString(argv.description)) return console.log('Ilegal argument: description/d'.red);
        const createObj = toDo.createObj(argv.description.trim());
        console.log(createObj !== undefined ? createObj : 'The object already exists'.red);
        break;
    case 'read':
        if (!isBoolean(argv.completeUndefined) && !isUndefined(argv.completeUndefined)) return console.log('Ilegal argument: completeUndefined/c'.red);
        const readObj = toDo.readObj(toBoolean(argv.completeUndefined));
        console.log(readObj.length ? readObj : 'No results found'.red);
        break;
    case 'update':
        if (!isString(argv.description)) return console.log('Ilegal argument: description/d'.red);
        if (!isBoolean(argv.completeTrue) && !isUndefined(argv.completeTrue)) return console.log('Ilegal argument: completeTrue/c'.red);
        const updateObj = toDo.updateObj(argv.description.trim(), toBoolean(argv.completeTrue));
        console.log(updateObj ? 'Updated object'.green : "The object doesn't exists".red);
        break;
    case 'delete':
        if (!isString(argv.description)) return console.log('Ilegal argument: description/d'.red);
        const deleteObj = toDo.deleteObj(argv.description.trim());
        console.log(deleteObj ? 'Deleted object'.green : "The object doesn't exists".red);
        break;
    default:
        console.log('Unrecognized command'.red);
        break;
}