
const { category } = require("../models");
const Category = require("../models/categories.model");

exports.createCategory = async (req, res) => {

    const { name, icon, returnV,  parent_name, categoryValue } = req.body

    const parent_id = await Category.find({ name: parent_name })
    const existingCategory = await Category.find({ name })

    if (name && categoryValue && !parent_name) {

        if (existingCategory.length) {
            return res.status(400).json({ message: "Category already exist" })
        }
        if (!existingCategory.length && !parent_id.length) {
            const newCategory = new Category({
                name,
                parent_id: null,
                returnV,
                icon,
                categoryValue,
            })
            await newCategory.save()

            return res.status(200).json({ message: "Category created successfully" })
        }

    }

    if (parent_id.length) {

        if (existingCategory.length) {

            if (existingCategory.length && parent_id.length) {
                await Category.findByIdAndUpdate(
                    existingCategory[0]._id,
                    { $addToSet: { parent_id: parent_id[0]._id } },  // $addToSet avoids duplicates
                    { new: true }
                )
                return res.status(200).json({ message: "Category updated successfully" })

            }
        }
        if (name && categoryValue) {
            const newCategory = new Category({
                name,
                parent_id: parent_id[0]._id,
                icon,
                categoryValue
            })

            await newCategory.save()
            return res.status(200).json({ message: "Category created successfully" })
        }

    }

    // if (parent_name) {
    //     if (!parent_id.length) {
    //         console.log('Category does not exist')
    //         res.status(400).json({ message: "Category does not exist" })
    //     }
    //     if (parent_id.length && !existingCategory.length) {
    //         const newCategory = new Category({
    //             name,
    //             parent_id: parent_id[0]._id,
    //             categoryValue
    //         })
    //         await newCategory.save()

    //         return res.status(200).json({ message: "Category created successfully" })
    //     }
    //     if (existingCategory) {
    //         const newCategory = new Category({
    //             name,
    //             parent_id: parent_id[0]._id,
    //             categoryValue
    //         })
    //         await newCategory.save()

    //         return res.status(200).json({ message: "Category created successfully" })
    //     }
    // }





}
exports.AllCategory = async (req, res) => {
    const categories = await Category.find()
    res.status(200).json({ categories })

}

exports.getMainCategory = async (req, res) => {

    const categories = await Category.find({ parent_id: null })
    res.status(200).json(categories)
}

exports.getSubCategory = async (req, res) => {
    const category = await Category.findOne({categoryValue: req.params.name})
    const categories = await Category.find({parent_id:category._id})
    res.status(200).json(categories)
     
    
}