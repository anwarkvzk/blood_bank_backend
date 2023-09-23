const userModels = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.body.userId);
    //check Admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      })
    }else{
        next()
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};
