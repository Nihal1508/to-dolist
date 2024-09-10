document.addEventListener('DOMContentLoaded', () => {
    const projectTitleInput = document.getElementById('project-title');
    const createProjectButton = document.getElementById('create-project');
    const projectsList = document.getElementById('projects');
    const projectDetailsSection = document.getElementById('project-details');
    const projectNameHeader = document.getElementById('project-name');
    const todoDescriptionInput = document.getElementById('todo-description');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const exportGistButton = document.getElementById('export-gist');
  
    let projects = []; // Array to store all projects
  
    // Function to create a new project
    createProjectButton.addEventListener('click', () => {
      const title = projectTitleInput.value.trim();
      if (title) {
        const project = { id: Date.now(), title, todos: [] };
        projects.push(project);
        renderProjects();
        projectTitleInput.value = ''; // Clear input
      }
    });
  
    // Function to render the list of projects
    function renderProjects() {
      projectsList.innerHTML = ''; // Clear previous list
      projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.title;
        li.addEventListener('click', () => showProjectDetails(project));
        projectsList.appendChild(li);
      });
    }
  
    // Function to show project details
    function showProjectDetails(project) {
      projectDetailsSection.style.display = 'block';
      projectNameHeader.textContent = `Project: ${project.title}`;
      renderTodos(project);
      
      addTodoButton.onclick = () => {
        const description = todoDescriptionInput.value.trim();
        if (description) {
          const todo = { id: Date.now(), description, completed: false };
          project.todos.push(todo);
          renderTodos(project);
          todoDescriptionInput.value = ''; // Clear input
        }
      };
  
      exportGistButton.onclick = () => {
        alert(`Exporting project "${project.title}" to GitHub as a secret gist...`);
        // Add logic for exporting the project as a gist here
      };
    }
  
    // Function to render the list of todos
    function renderTodos(project) {
      todoList.innerHTML = ''; // Clear previous list
      project.todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
          <span>${todo.description}</span>
          <button data-id="${todo.id}">Delete</button>
        `;
  
        // Checkbox to mark todo as complete
        li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
          todo.completed = e.target.checked;
        });
  
        // Button to delete a todo
        li.querySelector('button').addEventListener('click', (e) => {
          project.todos = project.todos.filter(t => t.id !== todo.id);
          renderTodos(project);
        });
  
        todoList.appendChild(li);
      });
    }
  });
  