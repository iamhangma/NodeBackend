const Users = require("../model/userModel")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken'); // Correct module name


const createUser = async (req, res) => {
    // step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const { firstName, lastName,phoneNumber ,email, password } = req.body;

    // step 3 : validate the incomming data
    if (!firstName || !lastName ||phoneNumber|| !email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Check existing user
        const existingUser = await Users.findOne({ email: email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            })
        }

        // password encryption
        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, randomSalt)

        // step 6 : create new user
        const newUser = new Users({
            // fieldname : incomming data name
            firstName: firstName,
            lastName: lastName,
            phoneNumber:phoneNumber,
            email: email,
            password: encryptedPassword,
        })

        // step 7 : save user and response
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User created successfully."
        })


    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }


}

const loginUser = async (req, res) => {
    // Step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const {email, password} = req.body;

    // step 3 : validate the incomming data
    if(!email || !password){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Find user
        const user = await Users.findOne({email : email}) // user store all the data of user
        if(!user){
            return res.json({
                success : false,
                message : "User does not exists."
            })
        }
        // Step 6 : Check password
        const passwordToCompare = user.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare)
        if(!isMatch){
            return res.json({
                success : false,
                message : "Password does not match."
            })
        }

        // Step 7 : Create token
        const token = jwt.sign(
            {id : user._id, isAdmin : user.isAdmin},
            process.env.JWT_TOKEN_SECRET,
        )

        // Step 8 : Send Response
        res.status(200).json({
            success : true,
            token : token,
            userData : user,
            message : "User logged in successfully."
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

module.exports = {
    createUser, loginUser
}