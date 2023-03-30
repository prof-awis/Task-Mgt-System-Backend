const Task = require("../models/task");
const Category = require("../models/category");

exports.getTasks = async (req, res, next) => {
  try {
    const { category } = req.query;
    console.log(category, req.user.id);

    let tasks = await Task.find({ category: category, createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category: category,
      createdBy: req.user.id,
    });

    await task.save();

    const tasks = await Task.find({ category, createdBy: req.user.id });

    res.status(201).json({ message: "Task created successfully", tasks });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updatedFields = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.user.id },
      updatedFields,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json({ message: "Task updated successfully", tasks });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const tasks = await Task.find({ createdBy: req.user.id });

    res.json({ message: "Task deleted successfully", tasks });
  } catch (err) {
    next(err);
  }
};
