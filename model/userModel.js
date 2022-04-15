const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			// required: true,
		},
		userImage: {
			type: String,
			// required: true,
		},
		email: {
			type: String,
			// required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		userpass: {
			type: String,
			trim: true,
			// required: true,
		},
		phoneno: {
			type: Number,
			// required: true,
		},
		dob: {
			type: String,
			// required: true,
		},
		passwordResetToken: String,
		active: {
			type: Boolean,
			default: false,
			select: false,
		},
		gender: {
			type: String,
		},
		activationToken: String,
	},
	// Mongoose schemas have a timestamps option that tells Mongoose
	//to automatically manage createdAt and updatedAt properties on your documents.
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('userpass')) return next();

  // Hash the password with cost of 12
  
  this.userpass = await bcrypt.hash(this.userpass, 12);

  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const user = mongoose.model("user", userSchema);

exports.User = user;
