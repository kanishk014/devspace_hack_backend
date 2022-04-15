require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
const userRouter = require("./routes/userRouter");
const meetingRouter = require("./routes/meetingRoutes");

const propertyRouter = require("./routes/propertyRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");



// app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV == "development") {
	//middleware
	app.use(morgan("dev"));
}
const mongodb = process.env.MONGO_URI;
mongoose
	.connect(mongodb, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Mongodb is connected");
	})
	.catch((e) => {
		console.log("Mogodb not connected");
	});
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use("/api/meet", meetingRouter);

app.use("/api/users", userRouter);
app.use("/api/property", propertyRouter);

app.get("/",(req,res)=>{
    res.json("Home")
})


app.use(notFound);
//Error middleware
//api right but doesnot match value
app.use(errorHandler);
app.listen(port, () => {
	console.log(`Server listens at http://localhost:${port}`);
});
