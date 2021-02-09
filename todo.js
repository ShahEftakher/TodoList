var allTasks = [];

function getTask() {
  let input = document.getElementById("list");
  console.log(input.value);
  saveTask(input.value);
  input.value = "";
}

function saveTask(input) {
  var keygen = Math.floor(Math.random() * 1000);
  var taskObj = { key: keygen, task: input, isComplete: false };
  console.log(typeof(allTasks));
  allTasks.push(taskObj);
  window.localStorage.setItem("task", JSON.stringify(allTasks));
  addElements(taskObj);
}

function addElements(input) {
  var field = (function () {
    var div = document.createElement("div");
    var paragraph = document.createElement("p");
    var form = document.createElement("form");
    var inputTask = document.createElement("input");
    inputTask.type = "text";
    inputTask.id = "task";
    var currentTask = input.task;
    if (input.isComplete) {
      paragraph.innerHTML = currentTask.strike();
    } else {
      paragraph.innerHTML = currentTask;
    }
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      if (editBtn.textContent === "Edit") {
        form.appendChild(inputTask);
        editBtn.textContent = "Update";
        inputTask.disabled = false;
        inputTask.value = input.task;
      } else {
        editBtn.textContent = "Edit";
        paragraph.innerHTML = inputTask.value;
        input.task = inputTask.value;
        inputTask.value = "";
        updateTask(input);
        inputTask.remove();
      }
    };
    form.onsubmit = function () {
      editBtn.textContent = "Edit";
      paragraph.innerHTML = inputTask.value;
      input.task = inputTask.value;
      inputTask.value = "";
      updateTask(input);
      inputTask.remove();
    };
    var completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed";
    completeBtn.onclick = function () {
      var strikeWord = input.task;
      paragraph.innerHTML = strikeWord.strike();
      input.isComplete = true;
      updateTask(input);
      editBtn.remove();
      inputTask.remove();
      console.log(strikeWord.strike());
    };
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = function () {
      div.remove();
      removeTask(input);
    };

    div.appendChild(form);
    div.appendChild(paragraph);
    if (input.isComplete) {
    } else {
      div.appendChild(editBtn);
    }
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);
    div.appendChild(document.createElement("br"));

    return div;
  })();
  document.getElementById("todo").appendChild(field);
}

function updateTask(input) {
  var currentIndex=allTasks.indexOf(input);
  console.log(currentIndex);
  console.log(input);
  allTasks[currentIndex]=input;
  window.localStorage.setItem("task", JSON.stringify(allTasks));
}

function removeTask(input) {
  var currentIndex=allTasks.indexOf(input);
  if (currentIndex > -1) {
    allTasks.splice(currentIndex, 1);
  }
  window.localStorage.setItem("task", JSON.stringify(allTasks));
}

function getTaskFromStorage() {
  allTasks = JSON.parse(window.localStorage.getItem("task"));
  if (allTasks === null) {
    window.localStorage.setItem("task", JSON.stringify([]));
    allTasks = JSON.parse(window.localStorage.getItem("task"));
  } else {
    allTasks.forEach((task) => {
      addElements(task);
    });
  }
}
getTaskFromStorage();
