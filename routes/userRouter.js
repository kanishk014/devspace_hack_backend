const express = require("express");
const userRouter = express.Router();
const { loginUser, registerUser, forgotPassword, resetPassword, verification, fetchData, updateUser } = require("../controller/user");
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.get('/verified/:activation_token', verification);
userRouter.get("/get/:id",fetchData)
userRouter.patch("/update/:id", updateUser);

module.exports=userRouter