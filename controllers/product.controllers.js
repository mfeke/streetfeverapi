const { errorMonitor } = require("nodemailer/lib/xoauth2");
const Product = require("../models/product.model");
const Category = require("../models/categories.model")

const imageUpload = require("../controllers/image")



exports.createProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, salePrice, description, colour, sizes, images, category } = req.body

    let categoryFound = await Category.findOne({ id })
    //if(!categoryFound){
    // return res.status(400).json({message:"Category does not exist"})
    // }
    //let  newProduct =  new Product({
    // name, 
    // price, 
    // salePrice,
    //description,
    //colour,
    //sizes,
    // images,
    //category:categoryFound._id
    //}) 
    console.log(req.body)
    res.status(200).json({data:req.files.location})
    //const results = await imageUpload.UploadImages(req.files, (progress) => {
      //console.log(`[${progress.fileName}]: ${progress.percentage}%`);
   // });
    
  //let imageLocation = await imageUpload.UploadImages(req.files)
 // console.log(imageLocation)
  //await newProduct.save()
  // return res.status(200).json({message:'Product is create successful'})

}catch (err) {
  res.status(500).json({ message: err })
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
