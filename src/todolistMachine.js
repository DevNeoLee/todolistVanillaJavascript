//selectors
const todoList = document.querySelector('.todoList');
const addTodo = document.querySelector('.addTodo');
const todoInput = document.querySelector('input[name="todoInput"]');
const submit = document.querySelector('.submit');
//젤 처으메 우리 appStorage에 로컬에 기존 정보가 있다면 넣어줍니다. 처음에 딱 한번 로컬에서 정보를 받아들이고
// 앞으론 localStorage에는 appStorage의 변화하는 정보를 변화 할때마다 반영만 시켜주는 방식입니다. 
const appStorage = JSON.parse(localStorage.getItem('todos')) || []

//machine class
var TodolistMachine = function() {
    this.todoList = todoList;
    this.addTodo = addTodo;
    this.submit = submit.addEventListener("click", this.insertTodo.bind(this));
};

//prototype methods
    // 단추가 눌러지면 그 정보 하나를 가져와 appStorage에 넣는다
    // 그리고 더해진 정보들을 가지고 그림을 그리고
    // 그 정보를 로컬스토러지에 압데해준다.
    TodolistMachine.prototype.insertTodo = function(event) {
        event.preventDefault();
        //내용이 없었으면 무시, 내용이 있을때만
        if (todoInput.value !== "") { 
            const todo = { text: todoInput.value, completed: false};
            //정보 하나 넣어주고
            appStorage.push(todo);
            //그림을 그려준다
            this.renderTodos();
            //로컬스토로지 압데
            this.localStorage();
            //value창 지워주기
            todoInput.value = "";
        }
    };

    // 전체 appStorage를 가져와 하나씩 그려준다.
    TodolistMachine.prototype.renderTodos = function() {
        //기존 todoList DOM 한번에 다 지워주고
        todoList.innerHTML = "";
        // 다시 압데이트된 appStorage내용을 하나씩 그려 줍니다.
        appStorage.forEach((todo, idx) => {
            //li만들어 내용 넣어주고
            const li = document.createElement('li');
            li.innerHTML = todo.text;
            li.dataset.index = idx; //순번을 넣어 줍니다.

            if (todo.completed === true ) {
                li.style.textDecoration = "line-through";
            }
            // if todo.completed === true class를 넣어주나 아님 css 를 바로 바꾸나
            li.classList.add('todoItem');
            
            //지우기 버튼 넣어주고
            const buttonDelete = document.createElement('button');
            buttonDelete.innerHTML =" delete ";
            buttonDelete.addEventListener('click', this.deleteTodo.bind(this));

            // complete 버튼 넣어주고
            const buttonCompleted = document.createElement('button');
            buttonCompleted.innerHTML = " completed ";
            buttonCompleted.addEventListener('click', this.completed.bind(this))

            li.appendChild(buttonDelete);
            li.appendChild(buttonCompleted);
            //child 로써 덧붙여 줍니다. 
            todoList.appendChild(li);
        }); 
    }
    //localStorage 압데시켜줍니다.
    TodolistMachine.prototype.localStorage = function() {
        localStorage.setItem('todos', JSON.stringify(appStorage));
    }

    //appStorage에서 지워주고
    //renderTodos
    //로컬Storage압데 
    TodolistMachine.prototype.deleteTodo = function(event) {
        const targetIndex = event.target.parentNode.dataset.index;
        appStorage.splice(targetIndex, targetIndex + 1);
        this.renderTodos();
        this.localStorage();
        // appStorage
    }
    
    //appStorage에서 바꿔주고 completed 가 토글됩니다.
    // 토글될때마다 그 true/false 에 따라 css 내용이 바뀝니다.
    // renderTodos 
    // 로컬스토러지 압데
    TodolistMachine.prototype.completed = function(event) {
      
        const targetIndex = event.target.parentNode.dataset.index;
        const list = appStorage[targetIndex];
        list.completed = !list.completed;
        //변화가 있음으로 
        this.renderTodos();
        this.localStorage();
        console.log(list.completed);
    }

    //addEventListener
    todoInput.addEventListener("click", function(){todoInput.value=""});


module.exports = TodolistMachine;
