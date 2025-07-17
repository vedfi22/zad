// Загрузка задач из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM-элементы
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');

// Рендер задач
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filteredTasks = filter === 'all' ? tasks : 
    filter === 'active' ? tasks.filter(task => !task.completed) : 
    tasks.filter(task => task.completed);

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" data-id="${index}">×</button>
    `;
    li.querySelector('span').addEventListener('click', () => toggleTask(index));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
    taskList.appendChild(li);
  });
}

// Добавление задачи
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value.trim()) {
    tasks.push({ text: taskInput.value.trim(), completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
});

// Переключение темы
themeToggle.addEventListener('click', () => {
  document.body.setAttribute('data-theme', 
    document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Фильтрация
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});

// Сохранение в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Запуск
renderTasks();