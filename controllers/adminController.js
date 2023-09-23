const userModels = require("../models/userModels");

//get Donar List
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModels
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar List API",
      error,
    });
  }
};

//get Hospital List
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModels
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: hospitalData.length,
      message: "Hospital List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital List API",
      error,
    });
  }
};

//get Org List
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModels
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in ORG List API",
      error,
    });
  }
};

//=====================================
//Delete donar
const deleteDonarController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200)({
      success: true,
      message: "Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting ",
      error,
    });
  }
};



//export
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
};
