const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }
    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    //rest data
    const user = new userModels(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
    });
  }
};
//Login CallBack
const loginController = async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!comparePassword){
      return res.status(500).send({
        success: false,
        message: 'Invalid Credentials'
      })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'});
    return res.status(200).send({
      success:true,
      message: 'Login Successfully',
      token ,
      user, 
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
module.exports = { registerController, loginController };
