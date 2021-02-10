//global variable to hold all the tasks
var allTasks = [];

//adding eventListener to the form
const todoForm = document.querySelector(".todoForm");
todoForm.addEventListener("submit", addTodo);

//add a todo
function addTodo(event) {
  //recieve input
  let input = document.getElementById("todo_Input");
  //handle empty input
  if (input.value === "") {
    alert("Add a Todo!");
    return;
  }
  //save task
  saveTask(input.value);
  //clear field
  input.value = "";
  event.preventDefault();
}

//save todo in the local storage
function saveTask(input) {
  //create the task object
  var taskObj = { task: input, isComplete: false };
  //push the task object to the array of tasks
  allTasks.push(taskObj);
  //save in the localStorage
  window.localStorage.setItem("task", JSON.stringify(allTasks));
  //add the task on the window
  addElements(taskObj);
}

//get data from local storage
document.addEventListener("DOMContentLoaded", function () {
  //get all tasks from localstorage
  allTasks = JSON.parse(window.localStorage.getItem("task"));
  //if local storage is empty create an empty array in the localstorage
  if (allTasks === null) {
    window.localStorage.setItem("task", JSON.stringify([]));
    allTasks = JSON.parse(window.localStorage.getItem("task"));
  }
  //retieve all tasks and display them
  allTasks.forEach((task) => {
    addElements(task);
  });
});

//add a todo with the html body
function addElements(input) {
  var field = (function () {
    //a div containing the tasks
    var div = document.createElement("div");

    //a paragrapgh to hold the form
    var paragraph = document.createElement("p");

    //form for updating task
    var form = document.createElement("form");

    //input field for editing the task
    var inputTask = document.createElement("input");

    //current task to edit
    var currentTask = input.task;

    //to cross the task when comleted
    var completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed";
    //onclick function to handle completed tasks
    completeBtn.onclick = function () {
      //striking the completed tasks
      var strikeWord = input.task;
      paragraph.innerHTML = strikeWord.strike();
      input.isComplete = true;
      updateTask(input);
      inputTask.remove();
      console.log(strikeWord.strike());
    };

    //remove a task
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    //onclick function for handling task remove
    deleteBtn.onclick = function () {
      //remove from display
      div.remove();
      //remove from storage
      removeTask(input);
    };

    //edit a task
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    //onclick function for handling edit
    editBtn.onclick = function () {
      //dyamically changing the button actions
      if (editBtn.textContent === "Edit") {
        form.appendChild(inputTask);
        editBtn.textContent = "Update";
        inputTask.value = input.task;
      } else {
        editBtn.textContent = "Edit";
        paragraph.innerHTML = inputTask.value;
        input.task = inputTask.value;
        input.isComplete = false;
        inputTask.value = "";
        updateTask(input);
        inputTask.remove();
      }
    };

    //handle submit hitting enter
    form.onsubmit = function (event) {
      editBtn.textContent = "Edit";
      paragraph.innerHTML = inputTask.value;
      input.task = inputTask.value;
      input.isComplete = false;
      inputTask.value = "";
      updateTask(input);
      inputTask.remove();
      event.preventDefault();
    };

    //check the task form localStorage for completed tasks
    if (input.isComplete) {
      paragraph.innerHTML = currentTask.strike();
    } else {
      paragraph.innerHTML = currentTask;
    }

    //append the whole task
    div.appendChild(form);
    div.appendChild(paragraph);
    div.appendChild(editBtn);
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);
    div.appendChild(document.createElement("br"));
    return div;
  })();
  document.getElementById("todo").appendChild(field);
}

//updating the edited tasks and storing then in the localStorage
function updateTask(input) {
  var currentIndex = allTasks.indexOf(input);
  console.log(currentIndex);
  console.log(input);
  allTasks[currentIndex] = input;
  window.localStorage.setItem("task", JSON.stringify(allTasks));
}

//removing a task
function removeTask(input) {
  var currentIndex = allTasks.indexOf(input);
  if (currentIndex > -1) {
    allTasks.splice(currentIndex, 1);
  }
  window.localStorage.setItem("task", JSON.stringify(allTasks));
}
