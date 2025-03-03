import express from 'express';
import { User } from '../../db/schema.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ firstName, lastName, email, password });
        const savedUser = await newUser.save();

        const token = sign({ id: savedUser._id, email: savedUser.email, firstName: savedUser.firstName, lastName: savedUser.lastName}, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = sign({ id: user._id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Error logging in' });
    }
});

export default userRouter;
