const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const sendemail = require("../utils/sendemail");
const ApiError = require("../utils/apierror");
const deleteCourseFromUser = require("./delete course from user");
require("dotenv").config();
const login = asynchandler(async (req, res, next) => {
  // @api   Post /auth/login
  // get email and password from request body
  const useremail = req.body.email;
  const userpassword = req.body.password;
  // find a user by email
  const user = useremail !== undefined ? await User.findOne({ email: useremail }) : await User.findOne({ phone: req.body.phone });
  // if user isn't found ,server send response ("no email is found")
  if (!user) {
    return next(new ApiError("no user is found",1341, 404));
  }
  const userCourses = await deleteCourseFromUser(user.enrolledCourse)
  user.enrolledCourse = userCourses
  user.lastSignedIn = new Date()
  await user.save()
  // compare password (comes from body ) and password (come from database)
  const isvalid = await bcrypt.compare(userpassword, user.password);
  // if password is invalid ,server send response ("password is invalid")
  if (!isvalid) {
    return next(new ApiError("password is invalid",8092, 400));
  }
  // use jsonwebtoken to get token
  const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT);
  // send response with all user details and token as cookie
  
  
  const {name,email,phone,parentsPhone,grade,city,gender,role,enrolledCourse} = user
  res.status(201).cookie("token", token,{ secure: true, sameSite: 'none'  }).json({email,name,phone,parentsPhone,grade,city,gender,role,enrolledCourse})
});

const register = asynchandler(async (req, res, next) => {
  // @api   Post /auth/register
  let {password,phone,parentsPhone} = req.body;
    if (phone === parentsPhone) {
      return next(new ApiError('phone and parents Phone must be different',4112,400))
    }     
    // create salt to use it for hashing password
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword
  const {owner} = req.query

    const user = await User.create({...req.body,lastSignedIn:new Date(),owner});
  // use jsonwebtoken to get token
    const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT );
    // send response with all user details and token as cookie
    const {name,email,grade,city,gender,role} = user
    res.status(201).cookie("token", token,{ secure: true, sameSite: 'none'  }).json({email,name,phone,parentsPhone,grade,city,gender,role})
});
const signout = asynchandler(async (req, res,next) => {
  // @api   Get /auth/signout
  // extract token
  res.status(200).cookie("token", "",{ secure: true, sameSite: 'none'  }).json({ msg: "signout is done" });
});
const profile = asynchandler(async (req, res,next) => {
  // @api   Get /auth/profile
  // extract token
  const { token } = req.cookies;
  // check the token, the user variable contain all details
    if (!token) {
      return next(new ApiError('un authorized',3824,401))
    }
    const user = jwt.verify(token, process.env.JWT);
    if (!user) {
      return next(new ApiError('un authorized',3824,401))
    }
    const userFromDB =await User.findOne({_id:user._id}).select("-password")
    if (!userFromDB) {
      return next(new ApiError('no user is found',1341,400))
    }
    userFromDB.lastSignedIn = new Date()
    const userCourses = await deleteCourseFromUser(userFromDB.enrolledCourse)
    userFromDB.enrolledCourse = userCourses
    await userFromDB.save()
    return res.status(200).json(userFromDB)
  });
const forgetpassword = asynchandler(async (req, res, next) => {
  // @desc  reset password
  // @api   Post /auth/forget-password
  // check if email is exist
  // send me email of user that (gmail) and i will send mail contain resثt code
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("no user is found",1341, 404));
  }
  // generate vefication code
  const resetcode = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashedresetcode = await bcrypt.hash(resetcode, salt);
  user.forgetpasswordcode = hashedresetcode;
  user.forgetpasswordvalidation = false;
  user.forgetpasswordexpired = Date.now() + 5 * 60 * 1000;
  user.save();
  // send email
  try {
    await sendemail({
      email: req.body.email,
      message: "Your paswword reset code (valid for 10 min)",
      text: "your verfication code is " + resetcode,
      name:user.name
    });
    res.status(200).json({ msg: "verfication code sent" });
  } catch (error) {
    user.forgetpasswordcode = undefined;
    user.forgetpasswordvalidation = undefined;
    user.forgetpasswordexpired = undefined;
    user.save();
    return next(new ApiError(error.message, 500));
  }
})
const verifycode = asynchandler(async (req, res, next) => {
  // @desc  verify-code
  // @api   Post /auth/verifycode
  // send email and resetCode 
  const user = await User.findOne({
    email: req.body.email,
    forgetpasswordexpired: { $gt: Date.now() },
  });
  const isvalid =  bcrypt.compare(
    req.body.resetCode,
    user.forgetpasswordcode
  );
  if (!user || !isvalid) {
    return next(new ApiError("reset codde is invalid or expired",8095, 400));
  }
  user.forgetpasswordvalidation = true;
  await user.save();
  res.status(200).json({ msg: "verify code is valid" });
});

const resetpassword = asynchandler(async (req, res,next) => {
  // @api   Put /auth/reset-password
  // send newPassword and email
  // get user from db
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("no user is found",1341, 404));
  }
  
  if (!user.forgetpasswordvalidation) {
    return next(new ApiError("reset code not verficated",8097, 400));
  }
  const salt = await bcrypt.genSalt(10);
  // hash password
  const hashedpassword = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hashedpassword;
  user.forgetpasswordcode = undefined;
  user.forgetpasswordvalidation = undefined;
  user.forgetpasswordexpired = undefined;
  await user.save();
  const { _doc } = user;
  console.log(user);
  // use jsonwebtoken to get token
  const token = jwt.sign({..._doc},process.env.JWT );
  // send response with all user details and token as cookie
  res.status(201).cookie("token", token).json({ msg: "password reset" });
});
module.exports = {
  login,
  register,
  profile,
  signout,
  resetpassword,
  verifycode,
  forgetpassword,
};
