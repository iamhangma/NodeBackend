const router = require('express').Router();
const productController = require("../controllers/productcontrollers");
const { authGuardAdmin } = require('../middleware/authGuard');


// Create product API
router.post('/create_product',authGuardAdmin, productController.createProduct)

// Get all products API
router.get("/get_products", productController.getAllProducts)

// Get single product API | /get_product/:id
router.get("/get_product/:id", productController.getSingleProduct)

// update product API
router.put("/update_product/:id",authGuardAdmin, productController.updateProduct)

// delete product API
router.delete("/delete_product/:id", authGuardAdmin, productController.deleteProduct)

//create order API
router.post("/create_order",productController.createOrder)

//create order API
router.get("/get_orders",productController.getOrders)


module.exports = router;