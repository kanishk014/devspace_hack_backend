const express = require("express");
const { getCreaterMeet, getRecieverMeet } = require("../controller/meet");
const meetingRouter = express.Router();

const { addMeeting } = require("../controller/meeting");
meetingRouter.post("/add", addMeeting);
meetingRouter.get("/get/:id", getCreaterMeet);
meetingRouter.get("/getreciever/:id", getRecieverMeet);

// propertyRouter.get("/get/:category", getProperty);
// propertyRouter.patch("/update/:id", updateProperty);
// propertyRouter.delete("/delete/:id", deleteProperty);
// propertyRouter.get("/getuserproperty/:id", getPropertyByUserId);
// propertyRouter.get("/getpropertydetails/:id", getPropertyDetailsById);

module.exports = meetingRouter;
