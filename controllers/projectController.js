const Project = require('../models/Project');
const axios = require('axios');

// Create a new project
exports.createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const project = new Project({ title });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err });
  }
};

// Add a new todo to a project
exports.addTodo = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    project.todos.push(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    const todo = project.todos.id(req.params.todoId);
    Object.assign(todo, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err });
  }
};

// Export project as a secret GitHub gist
exports.exportProjectAsGist = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    const completedTodos = project.todos.filter(todo => todo.status === 'Completed').length;
    const markdown = `# ${project.title}\n\n**Summary**: ${completedTodos} / ${project.todos.length} completed.\n\n## Pending Todos\n${project.todos.filter(todo => todo.status === 'Pending').map(todo => `- [ ] ${todo.description}`).join('\n')}\n\n## Completed Todos\n${project.todos.filter(todo => todo.status === 'Completed').map(todo => `- [x] ${todo.description}`).join('\n')}`;
    
    const gistResponse = await axios.post('https://api.github.com/gists', {
      description: `Project summary for ${project.title}`,
      public: false,
      files: {
        [`${project.title}.md`]: { content: markdown }
      }
    }, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });

    res.json(gistResponse.data);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting project as gist', error: err });
  }
};
