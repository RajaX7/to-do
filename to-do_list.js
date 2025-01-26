    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    loadTasks();
  
      addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value;
      console.log(taskText)
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
      }
    });
  
      function addTask(taskText) {
      const li = document.createElement('li');
      li.innerHTML = ` <span>${taskText}</span><button>Delete</button> `;
      taskList.appendChild(li);
  
        li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
  
        li.querySelector('button').addEventListener('click', () => {
        li.remove();
        saveTasks();
      });
  
      saveTasks();
    }
  
      function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach((li) => {
        tasks.push({
          text: li.querySelector('span').innerText,
          completed: li.classList.contains('completed'),
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
      function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        addTask(task.text);
        if (task.completed) {
          const li = taskList.lastElementChild;
          li.classList.add('completed');
        }
      });
    }
