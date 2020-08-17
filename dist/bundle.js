/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\nvar TodolistMachine = __webpack_require__(/*! ./todolistMachine */ \"./src/todolistMachine.js\");\n\n// window.TodolistMachine = TodolistMachine;\n\n(function(){\n    const todoMachine = new TodolistMachine();\n    todoMachine.renderTodos();\n})();\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/todolistMachine.js":
/*!********************************!*\
  !*** ./src/todolistMachine.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//selectors\nconst todoList = document.querySelector('.todoList');\nconst addTodo = document.querySelector('.addTodo');\nconst todoInput = document.querySelector('input[name=\"todoInput\"]');\nconst submit = document.querySelector('.submit');\n//젤 처으메 우리 appStorage에 로컬에 기존 정보가 있다면 넣어줍니다. 처음에 딱 한번 로컬에서 정보를 받아들이고\n// 앞으론 localStorage에는 appStorage의 변화하는 정보를 변화 할때마다 반영만 시켜주는 방식입니다. \nconst appStorage = JSON.parse(localStorage.getItem('todos')) || []\n\n//machine class\nvar TodolistMachine = function() {\n    this.todoList = todoList;\n    this.addTodo = addTodo;\n    this.submit = submit.addEventListener(\"click\", this.insertTodo.bind(this));\n};\n\n//prototype methods\n    // 단추가 눌러지면 그 정보 하나를 가져와 appStorage에 넣는다\n    // 그리고 더해진 정보들을 가지고 그림을 그리고\n    // 그 정보를 로컬스토러지에 압데해준다.\n    TodolistMachine.prototype.insertTodo = function(event) {\n        event.preventDefault();\n        //내용이 없었으면 무시, 내용이 있을때만\n        if (todoInput.value !== \"\") { \n            const todo = { text: todoInput.value, completed: false};\n            //정보 하나 넣어주고\n            appStorage.push(todo);\n            //그림을 그려준다\n            this.renderTodos();\n            //로컬스토로지 압데\n            this.localStorage();\n            //value창 지워주기\n            todoInput.value = \"\";\n        }\n    };\n\n    // 전체 appStorage를 가져와 하나씩 그려준다.\n    TodolistMachine.prototype.renderTodos = function() {\n        //기존 todoList DOM 한번에 다 지워주고\n        todoList.innerHTML = \"\";\n        // 다시 압데이트된 appStorage내용을 하나씩 그려 줍니다.\n        appStorage.forEach((todo, idx) => {\n            //li만들어 내용 넣어주고\n            const li = document.createElement('li');\n            li.innerHTML = todo.text;\n            li.dataset.index = idx; //순번을 넣어 줍니다.\n\n            if (todo.completed === true ) {\n                li.style.textDecoration = \"line-through\";\n            }\n            // if todo.completed === true class를 넣어주나 아님 css 를 바로 바꾸나\n            li.classList.add('todoItem');\n            \n            //지우기 버튼 넣어주고\n            const buttonDelete = document.createElement('button');\n            buttonDelete.innerHTML =\" delete \";\n            buttonDelete.addEventListener('click', this.deleteTodo.bind(this));\n\n            // complete 버튼 넣어주고\n            const buttonCompleted = document.createElement('button');\n            buttonCompleted.innerHTML = \" completed \";\n            buttonCompleted.addEventListener('click', this.completed.bind(this))\n\n            li.appendChild(buttonDelete);\n            li.appendChild(buttonCompleted);\n            //child 로써 덧붙여 줍니다. \n            todoList.appendChild(li);\n        }); \n    }\n    //localStorage 압데시켜줍니다.\n    TodolistMachine.prototype.localStorage = function() {\n        localStorage.setItem('todos', JSON.stringify(appStorage));\n    }\n\n    //appStorage에서 지워주고\n    //renderTodos\n    //로컬Storage압데 \n    TodolistMachine.prototype.deleteTodo = function(event) {\n        const targetIndex = event.target.parentNode.dataset.index;\n        appStorage.splice(targetIndex, targetIndex + 1);\n        this.renderTodos();\n        this.localStorage();\n        // appStorage\n    }\n    \n    //appStorage에서 바꿔주고 completed 가 토글됩니다.\n    // 토글될때마다 그 true/false 에 따라 css 내용이 바뀝니다.\n    // renderTodos \n    // 로컬스토러지 압데\n    TodolistMachine.prototype.completed = function(event) {\n      \n        const targetIndex = event.target.parentNode.dataset.index;\n        const list = appStorage[targetIndex];\n        list.completed = !list.completed;\n        //변화가 있음으로 \n        this.renderTodos();\n        this.localStorage();\n        console.log(list.completed);\n    }\n\n    //addEventListener\n    todoInput.addEventListener(\"click\", function(){todoInput.value=\"\"});\n\n\nmodule.exports = TodolistMachine;\n\n\n//# sourceURL=webpack:///./src/todolistMachine.js?");

/***/ })

/******/ });