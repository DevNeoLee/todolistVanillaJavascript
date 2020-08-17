

var TodolistMachine = require('./todolistMachine');

// window.TodolistMachine = TodolistMachine;

(function(){
    const todoMachine = new TodolistMachine();
    todoMachine.renderTodos();
})();

