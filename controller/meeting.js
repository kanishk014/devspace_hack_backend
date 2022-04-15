const asyncHandler = require("express-async-handler");
const { Meeting } = require("../model/meetingModel");


// exports.addMeeting = asyncHandler(async (req, res) => {
	// const {
	// 	createrId,
	// 	recieverId,

	// 	date,

	// 	time,

	// 	buyerName,
	// 	buyerPhone,
	// 	meetingID,
	// } = req.body;
	// console.log(req.body, "DATA");
	// res.json("reached");
	// const meetingExist = await Meeting.findOne({ meetingID: meetingID });
	// if (meetingExist) {
	// 	// res.status(401);
	// 	// throw new Error("Meeting already exist");
	// } else {
	// 	// console.log(req.body);
	// 	const meeting = await Meeting.create({
	// 		time: time,
	// 		buyerName: buyerName,

	// 		buyerPhone: buyerPhone,
	// 		date: date,
	// 		language: language,
	// 		createrId: createrId,
	// 		recieverId: recieverId,
	// 		meetingID: meetingID,
	// 	});
	// 	// console.log(lecture, "LOG");
	// 	if (meeting) {
			
	// 		res.status(200).res.json(meeting);
	// 	} else {
    //         res.status(400);
	// 		throw new Error("Meeting not found");
	// 	}
	// }
//     res.json("reacg")
// });


const mongoose = require("mongoose");
exports.addMeeting = asyncHandler(async (req, res) => {

	const {
			createrId,
			recieverId,
			date,
			time,
			buyerName,
			buyerPhone,
			meetingID,
	} = req.body;

	
	try {
		const newMeeting = await Meeting.create({
			time: time,
			buyerName: buyerName,

			buyerPhone: buyerPhone,
			date: date,
			createrId: mongoose.Types.ObjectId(createrId),
			recieverId: mongoose.Types.ObjectId( recieverId),
			meetingID: meetingID,
		});
	
		if (newMeeting) {
			res.status(200).json(newMeeting);
		} else {
			res.status(400);
			throw new Error("Meeting not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
	// if (propertyExist) {
	// 	res.status(401);
	// 	throw new Error("Property already exist");
	// } else {

	// }
});


