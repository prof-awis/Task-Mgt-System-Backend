const Category = require("../models/category");

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

    const category = new Category({
      name,
      createdBy: req.user.id,
    });

    await category.save();

    console.log(category);
    const categories = await Category.find({
      createdBy: req.user.id,
    });

    res.status(201).json({ categories, category: category._id.toString() });
  } catch (err) {
    next(err);
  }
};
