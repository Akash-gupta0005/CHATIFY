import User from '../models/user.model.js'
import generateToken from '../lib/utils.js';
import bcrypt from 'bcryptjs';


export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body;

    try {
        if(!fullName || !email || !password){
             return res.status(400).json({message:"All fields are required"}); 
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 chars"})
        }
        // regex (regular expression) -> check email validation
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"Email already exist"})
        
        const hashedPassword=await bcrypt.hash(password,12);
        
        const newUser=new User({
            email,
            fullName,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({message:"User registered successfully"})
        }else{ 
            res.status(400).json({message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller",error)
        res.status(500).json({message:"Internal Server Error"});
    }
}