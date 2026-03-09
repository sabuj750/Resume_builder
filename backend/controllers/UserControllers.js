import User from "../modals/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Resume from "../modals/Resume.js";
const generateToken = (userId) => {
  const token = jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn : "7d"});
  return token;
}

export const registerUser = async (req , res) => {
  try{
    const {name , email , password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message : "Please fill all the fields"});
    }
    const userExists = await User.findOne({
      email : email
    });
    if(userExists){
      return res.status(400).json({message : "User already exists"});
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password , salt);

    const user = await User.create({
      name,
      email,
      password : hashedPassword
    });

    const token = generateToken(user._id);
    // remove password from response
    user.password = undefined; 
    return res.status(201).json({message : "User registered successfully" , token , user : user});

  }catch(err){
    return res.status(500).json({message : "Server error"});
  }
}

export const loginUser = async (req , res) => {
  try{
    const {email , password} = req.body;
    if(!email || !password){
      return res.status(400).json({message : "Please fill all the fields"});
    }
    const user = await User.findOne({
      email : email
    });
    if(!user){
      return res.status(400).json({message : "Invalid credientials"});
    }
    if(!user.comparePassword(password)){
      return res.status(400).json({message : "Invalid Credientials"});
    }
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({message : "User logged in successfully" , token , user : user});

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

