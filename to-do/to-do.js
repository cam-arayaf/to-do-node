const fs = require('fs');
const path = 'db/data.json';
let toDoList = [];

const chargeDB = () => {
    try {
        toDoList = require(`../${ path }`);
    } catch (error) {
        toDoList = [];
    }
}

const saveDB = () => {
    fs.writeFile(path, JSON.stringify(toDoList), (err) => {
        if (err) throw err;
    });
}

const existsDB = description => {
    chargeDB();
    return toDoList.findIndex(task => task.description === description);
}

const createObj = description => {
    if (existsDB(description) !== -1) return;
    let toDo = { description, complete: false };
    toDoList.push(toDo);
    saveDB();
    return toDo;
}

const readObj = (complete = undefined) => {
    chargeDB();
    if (complete !== undefined) return toDoList.filter(task => task.complete === complete);
    return toDoList;
}

const updateObj = (description, complete = true) => {
    let index = existsDB(description);
    if (index === -1) return false;
    toDoList[index].complete = complete;
    saveDB();
    return true;
}

const deleteObj = description => {
    chargeDB();
    let newToDoList = toDoList.filter(task => task.description !== description);
    if (newToDoList.length === toDoList.length) return false;
    toDoList = newToDoList;
    saveDB();
    return true;
}

module.exports = { createObj, readObj, updateObj, deleteObj }