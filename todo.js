function displayList() {
  let input = document.getElementById("list");
  saveTask(input.value);
  input.value = "";
}

function saveTask(input) {
  var keygen = Math.floor(Math.random() * 1000);
  var taskObj = { key: keygen, task: input };
  window.localStorage.setItem(keygen, JSON.stringify(taskObj));
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
    paragraph.innerHTML = input.task;
    inputTask.disabled = true;
    var editBtn = document.createElement("button");
    editBtn.textContent = "update";
    editBtn.onclick = function () {
      if (editBtn.textContent === "update") {
        editBtn.textContent = "done";
        inputTask.disabled = false;
        inputTask.value = input.task;
      } else {
        editBtn.textContent = "update";
        paragraph.innerHTML = inputTask.value;
        input.task = inputTask.value;
        inputTask.value = "";
        inputTask.disabled = true;
        updateTask(input);
        console.log(inputTask.value);
      }
    };
    form.onsubmit = function () {
        editBtn.textContent = "update";
        paragraph.innerHTML = inputTask.value;
        input.task = inputTask.value;
        inputTask.value = "";
        inputTask.disabled = true;
        updateTask(input);
        console.log(inputTask.value);
      }
    var completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed";
    completeBtn.onclick = function () {
      div.remove();
      localStorage.removeItem(input.key);
    };

    form.appendChild(inputTask);
    div.appendChild(form);
    div.appendChild(paragraph);
    div.appendChild(editBtn);
    div.appendChild(completeBtn);
    div.appendChild(document.createElement("br"));

    return div;
  })();
  document.getElementById("todo").appendChild(field);
}

function updateTask(input) {
  window.localStorage.setItem(input.key, JSON.stringify(input));
}

function getTaskFromStorage() {
  var keys = Object.keys(localStorage);
  keys.forEach((key) => {
    var data = JSON.parse(window.localStorage.getItem(key));
    addElements(data);
  });
}
getTaskFromStorage();
