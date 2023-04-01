const Category = require("../models/category");
const Task = require("../models/task");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id });

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name: name,
      createdBy: req.user.id,
    });

    console.log(category, name);
    const categories = await Category.find({
      createdBy: req.user.id,
    });
    const tasks = await Task.find({ category, createdBy: req.user.id });

    res
      .status(201)
      .json({ categories, category: category._id.toString(), tasks });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updatedFields = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: taskId, createdBy: req.user.id },
      updatedFields
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categories = await Category.find({
      createdBy: req.user.id,
    });

    const tasks = await Task.find({ category, createdBy: req.user.id });

    res
      .status(201)
      .json({ categories, category: category._id.toString(), tasks });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const category = await Category.findOneAndDelete({
      _id: taskId,
      createdBy: req.user.id,
    });

    const categories = await Category.find({
      createdBy: req.user.id,
    });

    const tasks = await Task.find({
      category: categories[0]?._id.toString(),
      createdBy: req.user.id,
    });

    res
      .status(201)
      .json({ categories, category: categories[0]?._id.toString(), tasks });
  } catch (err) {
    next(err);
  }
};
