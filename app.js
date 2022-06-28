// SECTOR Variables

const formTemplate = document.querySelector(".ba-content-form");
const submitForm = document.querySelector(".ba-content-submit");
const appendContainer = document.querySelector(".ba-admin-tasks");
const completedTasksBtn = document.querySelector(".completed-tasks-btn");
const completedTasksContainer = document.querySelector(
  ".completed-tasks-container"
);

const fullTaskPreview = document.querySelector(".full-task-view-container");
const fullTaskPreviewOk = document.querySelector(".ok button");

const deletedAllTasksFinishedBtn = document.querySelector(
  ".deleted-all-tasks-btn"
);

const xTaskIcon = document.querySelector(".x-task-icon");

// This function deletes related item
function removeFromField(event) {
  removeBtn = event.target;
  removeBtnParent = removeBtn.parentElement;
  removeBtnGrandParent = removeBtnParent.parentElement;

  removeBtnGrandParent.remove();
}

// This function edits related field
function editField(event) {
  let preEditedTask = this.parentElement.parentElement.children[0].innerText;

  editBtn = event.target;
  editBtnParent = editBtn.parentElement;
  editBtnGrandParent = editBtnParent.parentElement;

  let newTask = prompt(
    "Edit a task?",
    `${editBtnGrandParent.children[0].innerText}`
  );

  if (newTask === null) newTask = preEditedTask;

  editBtnGrandParent.children[0].innerText = newTask;
}

// This function checked finished tasks
function completedTasks(e) {
  tickBtn = e.target;
  tickBtnParent = tickBtn.parentElement;
  tickBtnGrandParent = tickBtnParent.parentElement;

  tickBtnGrandParent.children[0].classList.toggle("finished-task");
  if (tickBtnGrandParent.children[0].classList.contains("finished-task")) {
    tickBtn.style.color = `var(--color-secondary--light-2)`;
  } else {
    tickBtn.style.color = `#333333`;
  }

  const makeTaskRow = document.createElement("div");
  makeTaskRow.classList.add("completed-task");
  makeTaskRow.innerHTML = `<p class="para-text">${tickBtnGrandParent.children[0].innerText}</p>`;
  completedTasksContainer.appendChild(makeTaskRow);
}

// SECTOR DOM's
formTemplate.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskFiled = e.target;
  let inputTask = taskFiled[0].value;

  const makeTaskRow = document.createElement("div");
  makeTaskRow.classList.add("admin-task");
  makeTaskRow.innerHTML = ` 
    <p class="para-text admin-para">${inputTask}</p>
    <div class="task-controller">
      <i class="fa-solid fa-eraser icon delete-task-icon"></i>
      <i class="fa-solid fa-pen icon edit-task-icon"></i>
      <i class="fa-solid fa-circle-check icon done-task-icon"></i>
      <i class="fa-solid fa-lock icon open-task-icon"></i>
    </div>
  `;

  // Check is there is a task written
  if (inputTask === "") {
    alert("Add a task!");
    appendContainer.removeChild(makeTaskRow);
  } else {
    appendContainer.appendChild(makeTaskRow);
    // delete text field for the next task
    taskFiled.children[2].children[0].value = "";
  }

  // erase the desired field
  const fieldEraser = document.querySelectorAll(".delete-task-icon");
  for (let i = 0; i < fieldEraser.length; i++) {
    fieldEraser[i].addEventListener("click", removeFromField);
  }

  // edit the desired field
  const fieldEditor = document.querySelectorAll(".edit-task-icon");
  for (let i = 0; i < fieldEditor.length; i++) {
    fieldEditor[i].addEventListener("click", editField);
  }

  // done with the task
  const finishedTasks = document.querySelectorAll(".done-task-icon");
  for (let i = 0; i < finishedTasks.length; i++) {
    finishedTasks[i].addEventListener("click", completedTasks);
  }

  // unlock  the task
  const openTaskIcon = document.querySelectorAll(".open-task-icon");
  for (let i = 0; i < openTaskIcon.length; i++) {
    openTaskIcon[i].addEventListener("click", function (event) {
      unlockMessage = event.target;
      unlockMessage.classList.toggle("display-none");

      if (unlockMessage.classList.contains("display-none")) {
        const makeEle = document.createElement("i");
        makeEle.classList.add("fa-solid");
        makeEle.classList.add("icon");
        makeEle.classList.add("fa-lock-open");
        unlockMessage.parentElement.appendChild(makeEle);

        makeEle.addEventListener("click", function (event) {
          lockMessage = event.target;
          lockMessage.remove();
          unlockMessage.classList.toggle("display-none");

          fullTaskPreview.style.display = "none";
        });

        fullTaskPreview.style.display = "block";
        fullTaskPreview.children[0].remove();
        const makeTaskRow = document.createElement("p");
        makeTaskRow.innerHTML = `<p>${unlockMessage.parentElement.parentElement.children[0].innerText}</p>`;
        fullTaskPreview.appendChild(makeTaskRow);

        // fullTaskPreviewOk.addEventListener("click", function () {
        //   fullTaskPreview.style.display = "none";
        //   unlockMessage.classList.toggle("display-none");
        // });
      }
    });
  }
});

// open completed tasks container
completedTasksBtn.addEventListener("click", function () {
  completedTasksContainer.style.opacity = 1;
  completedTasksContainer.style.visibility = "visible";
  completedTasksContainer.style.display = "flex";
});

// close completed tasks container
xTaskIcon.addEventListener("click", function () {
  completedTasksContainer.style.opacity = 0;
  completedTasksContainer.style.visibility = "hidden";
  completedTasksContainer.style.display = "none";
});

// delete all finished tasks in the completed tasks container
deletedAllTasksFinishedBtn.addEventListener("click", function () {
  const completedTasks = document.querySelectorAll(".completed-task");

  for (let i = 0; i < completedTasks.length; i++) {
    completedTasks[i].remove();
  }
});
