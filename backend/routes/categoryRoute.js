const { createCategories } = require("../controllers/categoryController");

const express = require('express');
categoryRoute = express.Router();

// //retrieve categories data from the database
// categoryRoute.get('/', getCategories);
// categoryRoute.get('/:slug', getCategory);

//creating a new category in database
categoryRoute.post('/', createCategories);

// //updating the category
// categoryRoute.patch('/:slug', updateCategory);
// //deleting the category
// categoryRoute.delete('/:slug', deleteCategory);


module.exports = categoryRoute;