/* Index.js using vue and examples from online resources (LearnCode Academy https://www.youtube.com/watch?v=Oyr5X5HwXhM)
*Created by Robert Thomas
*
*August. 19/2018
*
*/
var Todo = new Vue({
  el: '#Todo',
  data: {
    todo: '',
    todoTitle: 'Enter the Todo title',
    todoID: 'Enter the Todo ID',
    todoMod: '',
    todoList: 'Enter the Todo\'s List',
    todoComp: '',
    createTodoBool: false,
    editTodoBool: false,
    displayTodoBool: false,
  },
  methods: {

    /* To create a new todo */
    createTodo: function() {
        fetch("http://127.0.0.1:5000/todo", {
            method: "POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                "title": ""+this.todoTitle,
                "todo_list_id": ""+this.todoList
            })
        })
        .then(resp => resp.json())
        .then((data)=>{
            this.todo = data
        })
    },

    /* To allow input to create todo */
    createTodoOpen: function(){
        this.createTodoBool = true;
    },

    /* To delete todos */
    deleteTodo: function () {
        fetch("http://127.0.0.1:5000/todo/"+this.todo.id, {
            method: "DELETE"
        })
        .then(()=>{
            console.log(""+this.todo+" was removed from Todo");
        })
    },

    /* To display single todo */
    displayTodo: function() {
        fetch("http://127.0.0.1:5000/todo/"+this.todoID).then(resp => resp.json()).then((data)=>{
        this.todo = data
        })
        this.displayTodoBool = true;
    },

    /* edit a single todo */
    editTodo: function () {
        if(this.todoTitle !== 'Enter the Todo title' ||this.todoTitle !== '' ){
            fetch("http://127.0.0.1:5000/todo_lists/"+this.todoID, {
                method: "PATCH",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    "title":this.todoTitle,
                    "todo_list_id": this.todoList,
                    "completed": "true",
                }),
            })
            .then(resp => resp.json())
            .then((data)=>{
                this.message = data
            })
            this.message = this.todoTitle;
        }
        if(this.todoList !== 'Enter the Todo\'s List' ||this.todoList !== '' ){
            fetch("http://127.0.0.1:5000/todo_lists/"+this.todoID, {
                method: "PATCH",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    "title":this.todoTitle,
                    "todo_list_id": this.todoList,
                    "completed": "true",
                }),
            })
            .then(resp => resp.json())
            .then((data)=>{
                this.message = data
            })
            this.message = this.todoTitle;
        }
    },

    /* To allow entering input to edit todo */
    editTodoOpen: function(){
        this.editTodoBool = true;
    },
  },
})
var Lists = new Vue({
    el: '#Lists',
    data: {
        ListID: 'Enter List ID',
        ListName: 'Enter List Name',
        message: '',
        todos: [],
        alterList: false,
    },
    methods: {

        /* To display single list */
        displayList: function() {
            fetch("http://127.0.0.1:5000/todo_lists/"+this.ListID).then(resp => resp.json()).then((data)=>{
            this.message = data.name;
            this.todos = data.todos;})
        },

        /* To open the input to rename list */
        editList: function(){
            this.alterList = true;
        },

        /* To rename a list */
        nameList: function () {
            fetch("http://127.0.0.1:5000/todo_lists/"+this.ListID, {
                method: "PATCH",
                headers:{"Content-Type":"application/json"},  
                body:JSON.stringify({
                    "name":this.ListName,
                })
            })
            .then(resp => resp.json())
            .then((data)=>{
                this.message = data
            })
          this.message = this.ListName
        },
    },
})
var wholeList = new Vue({
    el: '#wholeList',
    data: {
        lists: [],
        newList: 'List Name',
        createNewList: false,
    },
    methods: {

        /* Removes the List */
        deleteList: function (ListID, inter) {
            fetch("http://127.0.0.1:5000/todo_lists/"+ListID,
            {
                method: "DELETE",
                body:{
                    "listId":ListID,
                }
            })
            .then(() =>{
                console.log(""+this.lists[inter]+" was removed from Todo Lists"+inter+" at this");
                this.lists.splice(inter, 1);
            })
        },

        /* Creates a new Lists */
        createList: function (newName) {
            fetch("http://127.0.0.1:5000/todo_lists",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },  
                body:JSON.stringify({
                    "name": ""+this.newList,
                }),
            })
            .then(() =>{
                console.log(""+this.newList+" was create in Todo Lists");
                this.lists.push({
                    "id": 0, "name": ""+this.newList,"todos": []
                });//placeholder to update list actually added on refresh
            })
        },

    },
    mounted() {
        fetch("http://127.0.0.1:5000/todo_lists").then(resp => resp.json()).then((data)=>{
            this.lists = data;
        })
    },
    template:
        `<div>
            <li v-for="list, i in lists">
                <button v-on:click="deleteList(list.id, i)">Delete Todo List</button> NAME: {{list.name}} ID: {{list.id}}
            </li>
            <li>    
                <div v-if="createNewList === true">
                    <input v-on:keyup.13="createList(newList)" v-model="newList"><button v-on:click="createList(newList)">Submit</button>
                </div>
                <div v-else>
                    <button v-on:click="createNewList = true">Create Todo List</button>
                </div>
            </li>
        </div>`,
})
var Search = new Vue({
    el: '#Search',
    data: {
        searchTitle: 'Enter Todo Title',
        message: '',
        todoSearch: [],
        openSearchBool: false,
    },
    methods: {

        /* To display all todos */
        displayTodos: function() {
            fetch("http://127.0.0.1:5000/todos").then(resp => resp.json()).then((data)=>{
                this.todoSearch = data;
            })
        },
        
        /* To display the input */
        openSearch: function(){
            this.openSearchBool = true;
        },

        /* To display all todos connected to search Title */
        searchTodo: function (searchTitle) {
            fetch("http://127.0.0.1:5000/todos", {
                method: "POST",
                headers:{"Content-Type":"application/json"},  
                body:JSON.stringify({
                    "title":this.searchTitle,
                })
            })
            .then(resp => resp.json())
            .then((data)=>{
                this.todoSearch = data
            })
          this.message = this.searchTitle
        },
    },
})

/* Function allows the opening of the tabs from the top of the page */
function openPage(evt, Name) {//function taken from previous school project done Mar.15/2018
    var i;
    var tabcontent;
    var tablinks;//var is needed to call in the index.html
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
}
