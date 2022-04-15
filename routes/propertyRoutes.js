const express = require("express");
const propertyRouter = express.Router();
// const { addProperty, getProperty, getPropertyByUserId } = require("../controller/properties");
// propertyRouter.post("/add", addProperty);
// propertyRouter.get("/get/:category", getProperty);

const { addProperty, getProperty, updateProperty, deleteProperty, getPropertyByUserId, getPropertyDetailsById } = require("../controller/properties");
propertyRouter.post("/add", addProperty);
propertyRouter.get("/get/:category", getProperty);
propertyRouter.patch("/update/:id", updateProperty);
propertyRouter.delete("/delete/:id", deleteProperty);
propertyRouter.get("/getuserproperty/:id", getPropertyByUserId);
propertyRouter.get("/getpropertydetails/:id", getPropertyDetailsById);

module.exports = propertyRouter;
