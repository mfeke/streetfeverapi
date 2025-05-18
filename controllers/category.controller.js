
const Category = require("../models/categories.model");

exports.createCategory = async (req, res) => {
    const { CatName, mainCategories, categoryValue, CategoriesArray, tagCodes } = req.body
    // finding if the main category already exists

    const newCategory = new Category({
        CatName,
        mainCategories,
        categoryValue,
        CategoriesArray,
        tagCodes
    })

    newCategory.save()
    res.status(200).json({ message: "Category created successfully" })


    // const newCategory = new Category({
    //     categoryValue,
    //     categoriesArray,
    //     catName,
    //     mainCategory,
    //     categoryValue,
    //     tagCodes
    // })
}
exports.AllCategory = async (req, res) => {
    const categories = await Category.find()
    res.status(200).json({ categories })

}