// import
const router = require('express').Router();
const userController = require("../controllers/userControllers")

// create user api
router.post('/create', userController.createUser)

//  task 1: create login api
router.post('/login', userController.loginUser)

// exporting
module.exports = router;