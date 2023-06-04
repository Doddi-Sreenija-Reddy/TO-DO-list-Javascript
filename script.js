const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const deadlineInput = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');
const remainingTasks = document.getElementById('remainingTasks');
const clearBtn = document.getElementById('clearBtn');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  remainingTasks.textContent = `Tasks Remaining: ${tasks.length}`;

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.title;
    taskItem.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
    });

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskDetails.innerHTML = `
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
    `;

    taskItem.appendChild(taskDetails);

    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '&#x2715;';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const deadline = deadlineInput.value;

  if (title !== '' && description !== '' && deadline !== '') {
    tasks.push({
      title,
      description,
      deadline,
      completed: false,
    });

    titleInput.value = '';
    descriptionInput.value = '';
    deadlineInput.value = '';

    renderTasks();
  }
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

taskList.addEventListener('click', (event) => {
  const taskItem = event.target.closest('li');
  if (taskItem && !event.target.classList.contains('delete-btn')) {
    const taskDetails = taskItem.querySelector('.task-details');
    taskDetails.classList.toggle('show');
  }
});

renderTasks();
