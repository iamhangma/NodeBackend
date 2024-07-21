const Orders = require('../model/orderModel');
const Products = require('../model/productModel');
const cloudinary = require('cloudinary');


const createProduct = async (req, res) => {
    // step 1 : Check incomming data
    console.log(req.body);
    console.log(req.files);

    // step:2 destructuring
    const { productName,
        productPrice,
        productDescription,
        productCategory } = req.body;

    const { productImage } = req.files;

    // step 3 : validate the data
    if (!productName || !productPrice || !productDescription || !productCategory || !productImage) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : upload image to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            productImage.path,
            {
                folder: "products",
                crop: "scale"
            }
        )

        // save the products
        const newProduct = new Products({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productCategory: productCategory,
            productImageUrl: uploadedImage.secure_url
        })
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })


    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }

}

// function for getting all products
const getAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Products.find();
        res.json({
            success: true,
            message: "Products fetched successfully",
            products: listOfProducts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
}

// get products by id
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            success: false,
            message: "Product ID is required!"
        })
    }
    try {
        const singleProduct = await Products.findById(id);
        res.json({
            success: true,
            message: "Product fetched successfully",
            product: singleProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
}

// update product
const updateProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    // destructuring
    const {
        productName,
        productPrice,
        productDescription,
        productCategory
    } = req.body;
    const { productImage } = req.files;

    // destructure id form URl
    const id = req.params.id;

    // validation
    if (!productName
        || !productPrice
        || !productDescription
        || !productCategory) {
        res.json({
            success: false,
            message: "All fields are required!"
        })
    }
    try {
        if (productImage) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder: "products",
                    crop: "scale"
                }
            )

            // update the product
            const updatedProduct = {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productCategory: productCategory,
                productImageUrl: uploadedImage.secure_url
            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct
            })

        } else {
            // update the product
            const updatedProduct = {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productCategory: productCategory,

            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product updated successfully without image",
                product: updatedProduct
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

}

// delete product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.json({
                success: false,
                message: "Product not found!"
            })
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

//create order
const createOrder = async (req, res) => {
    console.log(req.body);
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.json({
            success: false,
            message: "All fields are required!"
        })
    }
    try {
        const newOrder = new Orders({
            userId: userId,
            productId: productId,
            quantity: quantity
        });
        await newOrder.save();
        res.json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error
        })

    }

}

//get all orders with AND case | 1 is pending and 1 is orders quantity
//greater than 2 and populate the user
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find({
        
        })
        res.json({
            success: true,
            orders: orders
        })

    } catch (error) {
        console.log(error)
        res.send(error);
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    getOrders
}