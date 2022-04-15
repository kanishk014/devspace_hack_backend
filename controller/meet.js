

const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Meeting } = require("../model/meetingModel");
exports.addMeeting = expressAsyncHandler(async (req, res) => {
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
			language: language,
			createrId: mongoose.Types.ObjectId(createrId),
			recieverId: mongoose.Types.ObjectId(recieverId),
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

exports.getCreaterMeet = expressAsyncHandler(async (req, res) => {
	
	try {
		const meet = await Meeting.find({ createrId: req.params.id });
		if (meet) {
			res.status(200).json(meet);
		} else {
			res.status(400);
			throw new Error("Meeting not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});

exports.getRecieverMeet = expressAsyncHandler(async (req, res) => {
	try {
		const meet = await Meeting.find({ recieverId: req.params.id });
		if (meet) {
			res.status(200).json(meet);
		} else {
			res.status(400);
			throw new Error("Meeting not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});
