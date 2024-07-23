const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Users = require("../model/userModel");

const createUser = async (req, res) => {
    console.log(req.body);

    const { firstName, email, createpassword, confirmPassword } = req.body;

    if (!firstName || !email || !createpassword || !confirmPassword) {
        return res.json({
            success: false,
            message: "Please fill all the required fields."
        });
    }

    if (createpassword !== confirmPassword) {
        return res.json({
            success: false,
            message: "Passwords do not match."
        });
    }

    try {
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(createpassword, randomSalt);

        const newUser = new Users({
            firstName: firstName,
            email: email,
            createpassword: encryptedPassword,
            confirmPassword: encryptedPassword,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User created successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

const loginUser = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        });
    }

    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist."
            });
        }

        const isMatch = await bcrypt.compare(password, user.createpassword);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password does not match."
            });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_TOKEN_SECRET,
        );

        res.status(200).json({
            success: true,
            token: token,
            userData: user,
            message: "User logged in successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    createUser,
    loginUser
};
