import User from '../models/user.model.js'
import generateToken from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import 'dotenv/config';


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const name = typeof fullName === "string" ? fullName.trim() : "";
    const normalEmail=typeof email === "string"? email.trim().toLowerCase():"";
    const pass = typeof password === "string" ? password : "";
    try {
        if (!name || !normalEmail || !pass) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (pass.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 chars" })
        }
        // regex (regular expression) -> check email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(normalEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({ email:normalEmail })
        if (user) return res.status(400).json({ message: "Email already exist" })

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email: normalEmail,
            fullName: name,
            password: hashedPassword
        });
        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)

            res.status(201).json({ message: "User registered successfully" })
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENT_URL)
            } catch (error) {
                console.log(`Failed to send welcome email : ${error}`)
            }
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}