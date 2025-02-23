const progressBar = document.getElementById("progressbar");
const progress = document.getElementById("progress");
const statsNumber = document.getElementById("numbers");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")); //get the todos array from local storage
  if (savedTodos) {
    savedTodos.forEach((todo) => {
      todos.push(todo); //add the saved todos to the todos array
      updateTaskList(); //update the task list
      updateProgress(); //update the progress bar
    });
  }
}); //this is the function that listens for the DOMContentLoaded event
//create an empty array to store the todos
let todos = [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos)); //save the todos array to local storage
}; //this is the function that saves the todos array to local storage

//this is the function that gets the task from the input field and adds it to the todos array
const addTask = () => {
  const todoInput = document.getElementById("todo");
  const myInput = todoInput.value.trim(); //trim() removes any whitespace from the beginning and end of the input
  if (myInput) {
    todos.push({ myInput, completed: false }); //add the task to the todos array
    todoInput.value = ""; //clear the input field
    updateTaskList(); //update the task list
    updateProgress(); //update the progress bar
    saveTodos(); //save the todos array to local storage
  }
};

const toggleTaskComplete = (index) => {
  todos[index].completed = !todos[index].completed; //toggle the completed status of the task
  updateTaskList(); //update the task list
  updateProgress(); //update the progress bar
  saveTodos(); //save the todos array to local storage
}; //this is the function that toggles the completed status of a task

const removeTask = (index) => {
  todos.splice(index, 1); //remove the task from the todos array
  updateTaskList(); //update the task list
  updateProgress(); //update the progress bar
  saveTodos(); //save the todos array to local storage
}; //this is the function that removes a task from the list

const editTask = (index) => {
  const newTask = document.getElementById("todo"); //prompt the user to enter a new task
  newTask.value = todos[index].myInput; //set the value of the input field to the task being edited

  todos.splice(index, 1); //remove the task from the todos array
  updateTaskList(); //update the task list
  updateProgress(); //update the progress bar
  saveTodos(); //save the todos array to local storage
}; //this is the function that edits a task

const updateProgress = () => {
  const completedTasks = todos.filter((todo) => todo.completed).length; //get the number of completed tasks
  const totalTasks = todos.length; //get the total number of tasks

  const percentage = (completedTasks / totalTasks) * 100; //calculate the percentage of completed tasks

  progressBar.style.width = `${percentage}%`; //set the width of the progress bar
  progress.innerHTML = `${percentage.toFixed(0)}%`; //set the progress text
  statsNumber.innerHTML = `${completedTasks}/${totalTasks}`; //set the number of completed tasks and total tasks
  saveTodos(); //save the todos array to local storage
  if (todos.length === completedTasks) {
    blastConfetti();
  }
}; //this is the function that updates the progress bar
//this is the function that updates the task list
const updateTaskList = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    //loop through the todos array
    const li = document.createElement("li"); //create a list item element
    li.innerHTML = `
    <div class="taskItem">
        <div class="task ${todo.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" id="todo-${index}" ${
      todo.completed ? "checked" : ""
    }/>
            <p>${todo.myInput}</p>
        </div>
        <div class="icons">
            <button onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="removeTask(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `; //add the task to the list item
    li.addEventListener("change", (e) => toggleTaskComplete(index)); //listen for the change event of the checkbox
    todoList.appendChild(li); //add the list item to the todo list
  });
};

//listen for click event of the add button
addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //this is the function that adds a task to the list being called whenever the add button is clicked
  addTask();
});

//this is the function that blasts confetti when all tasks are completed
const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
