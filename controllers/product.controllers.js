const { errorMonitor } = require("nodemailer/lib/xoauth2");
const Product = require("../models/product.model");
const Category = require("../models/categories.model")

const imageUpload = require("../controllers/image")



exports.createProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, priceSale, description, colour, material, variant, category } = req.body

    let images = req.files
    images = images.map(info => info.location);
    

    //if(!categoryFound){
    // return res.status(400).json({message:"Category does not exist"})
    // }
    let  newProduct =  new Product({
    name, 
    price,
    priceSale,
    description,
    material,
    variant:JSON.parse(variant),
    images,
    category:JSON.parse(category)
   }) 
    
  
   await newProduct.save()
   return res.status(200).json({message:'Product is create successful'})

}catch (err) {
  console.error(err)
  res.status(500).json({ message: err.message })
}
}



exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getProductsByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.find({ title: name });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getProductByCateName = async ( req, res) =>{

  let {name} = req.params
  //let products = Product.find({
     // category: { $elemMatch: { name } }
  //})
  
  const products = await Product.find({
      category: { $elemMatch: { name } }
      });

  res.status(200).json(products)

}