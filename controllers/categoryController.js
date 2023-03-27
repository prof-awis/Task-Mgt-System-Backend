const Category = require('../models/category');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = new Category({
      name
    });

    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    next(err);
  }
};

