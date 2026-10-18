import User from "../modals/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Resume from "../modals/Resume.js";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateToken = (userId) => {
  const token = jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn : "7d"});
  return token;
}

export const registerUser = async (req , res) => {
  try{
    const {name , email , password} = req.body ?? {};
    if(typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password){
      return res.status(400).json({message : "Please fill all the fields"});
    }
    const normalizedEmail = email.trim().toLowerCase();
    if(!isValidEmail(normalizedEmail)){
      return res.status(400).json({message : "Please provide a valid email address"});
    }

    const userExists = await User.findOne({
      email : normalizedEmail
    });
    if(userExists){
      return res.status(409).json({message : "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password : hashedPassword
    });

    const token = generateToken(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(201).json({message : "User registered successfully" , token , user : userResponse});

  }catch(error){
    if(error && error.code === 11000){
      return res.status(409).json({message : "User already exists"});
    }
    return res.status(500).json({message : "Server error"});
  }
}

export const loginUser = async (req , res) => {
  try{
    const {email , password} = req.body ?? {};
    if(typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password){
      return res.status(400).json({message : "Please fill all the fields"});
    }
    const normalizedEmail = email.trim().toLowerCase();
    if(!isValidEmail(normalizedEmail)){
      return res.status(400).json({message : "Please provide a valid email address"});
    }

    const user = await User.findOne({
      email : normalizedEmail
    });
    if(!user){
      return res.status(400).json({message : "Invalid credentials"});
    }
    if(!await user.comparePassword(password)){
      return res.status(400).json({message : "Invalid credentials"});
    }
    const token = generateToken(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({message : "User logged in successfully" , token , user : userResponse});

  }catch(error){
    return res.status(500).json({message : "server error"});
  }
}

export const getUserById = async (req , res) => {
  try{
    const userId = req.userId;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message : "User not found"});
    }

    user.password = undefined;

    return res.status(200).json({user : user});
    
  }catch(error){
    return res.status(500).json({message : "Server error"});
  }
}


// resume controllers

export const getUserResumes = async (req , res) => {
  try{
    const userId = req.userId;
    const resumes = await Resume.find({userId : userId});
    return res.status(200).json({resumes : resumes});
  }catch(error){
    return res.status(500).json({message : "Server error"});
  }
}
