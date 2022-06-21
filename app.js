// SECTOR Variables

const formTemplate = document.querySelector(".ba-content-form");
const submitForm = document.querySelector(".ba-content-submit");
const appendContainer = document.querySelector(".ba-admin-tasks");

// This function deletes related item
function removeFromField(event) {
  removeBtn = event.target;
  removeBtnParent = removeBtn.parentElement;
  removeBtnGrandParent = removeBtnParent.parentElement;

  removeBtnGrandParent.remove();
}

// This function edits related field
function editField(event) {
  editBtn = event.target;
  editBtnParent = editBtn.parentElement;
  editBtnGrandParent = editBtnParent.parentElement;

  const newTask = prompt(
    "Edit a task?",
    `${editBtnGrandParent.children[0].innerText}`
  );
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
    tickBtn.style.color = `var(--color-primary)`;
  }
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
    </div>
  `;
  appendContainer.appendChild(makeTaskRow);

  // eraser
  const fieldEraser = document.querySelectorAll(".delete-task-icon");
  for (let i = 0; i < fieldEraser.length; i++) {
    fieldEraser[i].addEventListener("click", removeFromField);
  }

  // editor
  const fieldEditor = document.querySelectorAll(".edit-task-icon");
  for (let i = 0; i < fieldEditor.length; i++) {
    fieldEditor[i].addEventListener("click", editField);
  }

  // done
  const finishedTasks = document.querySelectorAll(".done-task-icon");
  for (let i = 0; i < finishedTasks.length; i++) {
    finishedTasks[i].addEventListener("click", completedTasks);
  }
});
