import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from "express-async-handler";
import User from "../model/user.js";


export const protect = asyncHandler(async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  })


// export const protect = asyncHandler(async(req, res, next) => {
//     let token

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try {
//             //Get token from header
//             token = req.headers.authorization.split(" ")[1]

//             //Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)

//             //Get user from token
//             req.user = await User.findById(decoded.id).select('-password')
//             next()
//         } catch(error){
//             console.log(error)
//             res.status(401)
//             throw new Error("Not Authorized")
//         }
//     }

//     if(!token){
//         res.status(401)
//         throw new Error("No Token")
//     }
// });