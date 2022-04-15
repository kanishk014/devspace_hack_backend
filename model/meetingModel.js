const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
	{
		createrId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "User",
		},
		recieverId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "User",
		},

	
		date: {
			type: String,
			// required: true,
		},
		time: {
			type: String,
			// required: true,
		},
		buyerName: {
			type: String,
			// required: true,
		},
		buyerPhone: {
			type: String,
			// required: true,
		},
		meetingID: {
			type: String,
			// required: true,
		},
	
	},
	// Mongoose schemas have a timestamps option that tells Mongoose
	//to automatically manage createdAt and updatedAt properties on your documents.
	{ timestamps: true }
);

const meeting = mongoose.model("meeting", meetingSchema);

exports.Meeting = meeting;
