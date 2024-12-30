// < ===== Show User Information ===== >

function showUserInfo() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      Swal.fire({
          title: 'User Information',
          html: `
              <p>Name: ${currentUser.name}</p>
              <p>Email: ${currentUser.email}</p>
              <p>ID: ${currentUser.id}</p>
          `,
          icon: 'info',
          confirmButtonText: 'Logout',
      }).then((result) => {
          if (result.isConfirmed) {
              logoutUser();
          }
      });
  } else {
      Swal.fire('No User Logged In', '', 'warning');
  }
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  Swal.fire('Logged Out', '', 'success').then(() => {
      window.location.href = '../../index.html';
  });
}

// < ===== Add Todo ===== >

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();
  if (!todoText) {
      Swal.fire('Error', 'Todo cannot be empty!', 'error');
      return;
  }

  const timestamp = new Date().toLocaleString();
  const todo = createTodoItem(todoText, timestamp);

  const isDarkMode = document.getElementById('toggleTheme').checked;
  if (isDarkMode) {
      todo.classList.add('dark-theme');
  }

  document.getElementById('todo-list').appendChild(todo);
  saveTodoToLocalStorage({ text: todoText, timestamp });
  todoInput.value = '';
}

function createTodoItem(todoText, timestamp) {
  const li = document.createElement('li');
  li.innerHTML = `
      <span>${todoText}</span>
      <span class="date">${timestamp}</span>
      <button onclick="editTodo(this)">Edit</button>
      <button onclick="deleteTodo('${todoText}', this)">Delete</button>
  `;
  return li;
}

function editTodo(button) {
  const li = button.parentElement;
  const textSpan = li.querySelector('span');
  const oldText = textSpan.textContent;

  const newText = prompt('Edit your todo', oldText);
  if (newText && newText !== oldText) {
      textSpan.textContent = newText;

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          const todos = JSON.parse(localStorage.getItem('todos') || '{}');
          const userTodos = todos[currentUser.id] || [];
          const todoIndex = userTodos.findIndex((todo) => todo.text === oldText);
          if (todoIndex !== -1) {
              userTodos[todoIndex].text = newText;
              todos[currentUser.id] = userTodos;
              localStorage.setItem('todos', JSON.stringify(todos));
          }
      }
  }
}

function saveTodoToLocalStorage(todo) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      const todos = JSON.parse(localStorage.getItem('todos') || '{}');
      const userTodos = todos[currentUser.id] || [];
      userTodos.push(todo);
      todos[currentUser.id] = userTodos;
      localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function deleteTodo(todoText, element) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      const todos = JSON.parse(localStorage.getItem('todos') || '{}');
      const userTodos = todos[currentUser.id] || [];
      const updatedTodos = userTodos.filter((todo) => todo.text !== todoText);
      todos[currentUser.id] = updatedTodos;
      localStorage.setItem('todos', JSON.stringify(todos));
      element.parentElement.remove();
  }
}

function clearAllTodos() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      const todos = JSON.parse(localStorage.getItem('todos') || '{}');
      delete todos[currentUser.id];
      localStorage.setItem('todos', JSON.stringify(todos));
  }
  document.getElementById('todo-list').innerHTML = '';
  Swal.fire('All Todos Cleared!', '', 'success');
}

function loadTodosFromLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      const todos = JSON.parse(localStorage.getItem('todos') || '{}');
      const userTodos = todos[currentUser.id] || [];
      const todoList = document.getElementById('todo-list');
      userTodos.forEach((todo) => {
          const todoItem = createTodoItem(todo.text, todo.timestamp);
          if (document.body.classList.contains('dark-theme')) {
              todoItem.classList.add('dark-theme');
          }
          todoList.appendChild(todoItem);
      });
  }
}

function toggleTheme() {
  const isDarkMode = document.getElementById('toggleTheme').checked;
  document.body.classList.toggle('dark-theme', isDarkMode);
  document.getElementById('navbar').classList.toggle('dark-theme', isDarkMode);
  document.getElementById('toggleLabel').textContent = isDarkMode ? '🌙 Dark Mode' : '🌞 Light Mode';

  const todoItems = document.querySelectorAll('li');
  todoItems.forEach(item => {
      item.classList.toggle('dark-theme', isDarkMode);
  });

  document.querySelector('.container').classList.toggle('dark-theme', isDarkMode);
  
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function loadThemeFromLocalStorage() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.getElementById('toggleTheme').checked = true;
      document.body.classList.add('dark-theme');
      document.getElementById('navbar').classList.add('dark-theme');
      document.getElementById('toggleLabel').textContent = '🌙 Dark Mode';

      const todoItems = document.querySelectorAll('li');
      todoItems.forEach(item => {
          item.classList.add('dark-theme');
      });

      document.querySelector('.container').classList.add('dark-theme');
  }
}

document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

window.addEventListener('DOMContentLoaded', () => {
  loadTodosFromLocalStorage();
  loadThemeFromLocalStorage();
});
