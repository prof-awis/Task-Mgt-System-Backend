const Task = require('../models/task');
const Category = require('../models/category');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.userId });

    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, categoryId } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      type: category._id,
      createdBy: req.userId
    });

    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updatedFields = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.userId },
      updatedFields,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({ _id: taskId, createdBy: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', task });
  } catch (err) {
    next(err);
  }
};