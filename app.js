const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let todos = [];
document.addEventListener("DOMContentLoaded", function () {
    loadTodos();
    renderTodos();
});
function addTask(){
        let temp;

        if(inputbox.value === ''){
            alert("You must write something!");

        }
        else{
            let li = document.createElement("li");

            let checkIcon = document.createElement('ion-icon');
            let closeIcon = document.createElement('ion-icon');
            checkIcon.classList.add('checkIcon');

            checkIcon.name = "ellipse-outline";
            closeIcon.name = "close-circle-outline";

            listContainer.appendChild(li);

            let closeIconContainer =  document.createElement("div");
            let checkIconContainer = document.createElement("div");
            checkIconContainer.appendChild(checkIcon);
            closeIconContainer.appendChild(closeIcon);
            let todoText = document.createElement('div');
            todoText.classList.add('todoText');
            todoText.innerHTML = inputbox.value;
            temp=inputbox.value;


            li.appendChild(checkIconContainer);
            li.appendChild(todoText);
            li.appendChild(closeIconContainer);
            checkIconContainer.addEventListener('click', function () {
                markAsChecked(temp,checkIcon);
                updateTodoStyle(li, temp);
            });
            closeIconContainer.addEventListener('click', function () {
                deleteTask(temp);
                li.remove();
            });


        }
        inputbox.value = "";
        if(temp){
            let todo={
                text:temp,
                checked:false,
            }
            saveData(todo);
            console.log(todos);
        }
        
}
// listContainer.addEventListener("click",function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");
//         saveData();

//     }
//     else if (e.target.tagName === "SPAN"){
//         e.target.parentElement.remove();
//         saveData();


//     }
// }, false);

function saveData(todo){
    todos.push(todo)
    saveTodos();
}
// function showTask(){
//     listContainer.innerHTML = localStorage.getItem("data");

// }
// showTask();
function deleteTask(text) {
    const index = todos.findIndex(todo => todo.text === text);
    todos.splice(index, 1);
    saveTodos();
}
function markAsChecked(text,checkIcon) {
    const todo = todos.find(todo => todo.text === text);
    todo.checked = !todo.checked ;
    checkIcon.name = todo.checked ? 'checkmark-circle-outline' : 'ellipse-outline';
    saveTodos();
    
}
function updateTodoStyle(li, text) {
    const todo = todos.find(todo => todo.text === text);
    const todoText = li.querySelector('.todoText');
    if (todo.checked) {
        todoText.style.textDecoration = 'line-through';
    } else {
        todoText.style.textDecoration = 'none';
    }
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    todos = storedTodos ? JSON.parse(storedTodos) : [];
}


function renderTodos() {
    // Clear the existing list
    listContainer.innerHTML = "";

    // Iterate over the todos array and render each task
    todos.forEach((todo) => {
        let li = document.createElement("li");

        let checkIcon = document.createElement("ion-icon");
        let closeIcon = document.createElement("ion-icon");

        checkIcon.classList.add("checkIcon");
        closeIcon.name = "close-circle-outline";

        let closeIconContainer = document.createElement("div");
        let checkIconContainer = document.createElement("div");
        checkIconContainer.appendChild(checkIcon);
        closeIconContainer.appendChild(closeIcon);
        let todoText = document.createElement("div");
        todoText.classList.add("todoText");
        todoText.innerHTML = todo.text;

        li.appendChild(checkIconContainer);
        li.appendChild(todoText);
        li.appendChild(closeIconContainer);

        // Set the icon name and styling based on the checked property
        if (todo.checked) {
            checkIcon.name = "checkmark-circle-outline";
            todoText.style.textDecoration = "line-through";
        } else {
            checkIcon.name = "ellipse-outline";
            todoText.style.textDecoration = "none";
        }

        // Add onclick event for the checkmark icon
        checkIconContainer.addEventListener("click", function () {
            markAsChecked(todo.text, checkIcon);
            updateTodoStyle(li, todo.text);
            saveTodos();
        });

        // Add onclick event for the close icon
        closeIconContainer.addEventListener("click", function () {
            deleteTask(todo.text);
            li.remove();
            saveTodos();
        });

        // Append the list item to the list container
        listContainer.appendChild(li);
    });
}