// Internal Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Internal Dependencies
const People = require('../models/People');

// User Creation
const createUserController = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, password, confirmPassword } = req.body;

        // Check the existing user
        const existingUser = await People.findOne({ $or: [{ email: email }, { mobile: mobile }] });

        if (existingUser) {
            return res.status(403).json({ message: 'User already registered!' });
        }

        // Hash the password
        const hassedPassword = await bcrypt.hash(password, 10);

        const newUser = new People({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            password: hassedPassword,
            role: req.body.role
        })

        // Save the user to the database
        await newUser.save();

        // Remove the password from the user response
        // newUser.password = undefined;

        // Response
        res.status(201).json({
            message: `Welcome ${firstName} ${lastName}. Your account was successfully created.`,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Sorry, Registration Failed. Please try again later.',
        })
    }
}

// Login User
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Either User Email or Mobile is correct
        // const existingUser = await People.findOne({ $or: [{ email: user }, { mobile: user }] });
        const existingUser = await People.findOne({ email: email });

        if (!existingUser) {
            return res.status(403).json({ message: 'Not a valid registered user.' });
        }

        // Password Checking
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(403).json({ message: 'Incorrect password' })
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
                mobile: existingUser.mobile,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY_TIME,
            }
        );

        // Set Cookie
        res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY_TIME,
            httpOnly: true,
            signed: true,
        });

        // Response
        res.status(200).json({
            message: 'Logged in successfully',
            token: token
        })
    } catch (error) {
        res.status(400).json({
            message: 'Sorry, Login Failed. Please try again later.',
        })
    }
}

// Logout User
const logoutUserController = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({ message: 'Logged out successfully' });
};

// Fetch All Users
const fetchAllUsersController = async (req, res) => {
    try {
        const users = await People.find({});

        // Check Existing Users
        if (!users) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // Response
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            message: 'Error Fetching Data.',
        })
    }
};

// Fetch Single Users
const fetchSingleUsersController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await People.find({ _id: id });

        // Check Existing User
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Response
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Error Fetching Data',
        })
    }
};

// Update Users
const updateUsersController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;

        // Check
        if (decoded.id !== id) {
            return res.status(404).json({ message: 'You don\'t have permission to update the information.' });
        }

        // User Object
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };

        // Update User
        const updatedUser = await People.findByIdAndUpdate(id, userData, { new: true });

        // Checking
        if (!updatedUser) {
            return res.status(200).json({
                error: 'Failed to update user',
            })
        }

        // Save Data
        await updatedUser.save();

        // Response
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        res.status(400).json({
            message: 'An error occurred!',
        })
    }
};

// Update Users
const deleteUsersController = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;

        // Check
        if (decoded.id !== id && decoded.role !== 'admin') {
            return res.status(404).json({ message: 'You don\'t have permission to delete the user.' });
        }

        // Check Existing User
        const user = await People.findByIdAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Response
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'An error occured!',
        })
    }
};

// Export Module
module.exports = {
    createUserController,
    loginUserController,
    logoutUserController,
    fetchAllUsersController,
    fetchSingleUsersController,
    updateUsersController,
    deleteUsersController
}