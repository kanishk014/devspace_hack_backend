require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../model/userModel");
const Email = require("../utils/email");
const crypto = require("crypto");

const { generateToken } = require("../utils/generateToken");

exports.loginUser = asyncHandler(async (req, res) => {
	const { email, userpass } = req.body;
	// console.log(req.body, "AUTH");
	const user = await User.findOne({ email: email }).select("+active");

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	// console.log(userpass);

	if (!user.active) {
		res.status(403);
		throw new Error("Please activate your email!");
	}

	// const encrypted = await bcrypt.hash(userpass, 12);

	// console.log(user.userpass);

	if (user && (await bcrypt.compare(userpass, user.userpass))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,

			// userImage:user.userImage,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

exports.registerUser = asyncHandler(async (req, res) => {
	// const { email, userpass, name, userImage, phoneno } = req.body;
	const userExist = await User.findOne({ email: req.body.email });
	// console.log(req.body);
	if (userExist) {
		res.status(401);
		throw new Error("User already exist");
	} else {
		let token = crypto.randomBytes(32).toString("hex");
		const activationToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		const newUser = await  User.create({
			name: req.body.name,
			email: req.body.email,
			userpass: req.body.userpass,
			phoneno: req.body.phoneno,
			dob: req.body.dob,
			gender: req.body.gender,
			userImage: req.body.userImage,
			activationToken,
		})
			// .then(() => {
			// 	console.log("saved");
			// })
			// .catch((e) => {
			// 	console.log("Failed", e.message);
			// });
        console.log("NEW",newUser);
		if (newUser) {
			// const url = `${req.protocol}://${req.get(
			// 	"host"
			// )}/api/users/verified/${activationToken}`;
			const url = `https://vrdoor.netlify.app/activateuser?activate=${activationToken}`;

			await new Email(newUser, url).sendActivationEmail();

			res.status(200).json(newUser);
		} else {
			res.status(400);
			throw new Error("User not found");
		}
	}
});

exports.verification = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findOne({
			activationToken: req.params.activation_token,
		});

		if (!user) {
			res.status(401);
			throw new Error("Your activation token is invalid or may have expired.");
		}

		user.active = true;
		user.activationToken = undefined;
		await user.save({ validateBeforeSave: false });

		const url = `https://vrdoor.netlify.app/Login`;

		await new Email(user, url).sendWelcome();
		res.status(200).json(user);
		// res.status(200).json({
		// 	status: "success",
		// 	user,
		// 	message: "User verified",
		// });
	} catch (e) {
		throw new Error(e.message);
	}
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.status(400);
		throw new Error("User not found with this email!");
	}

	const resetToken = user.createPasswordResetToken();

	// console.log(resetToken);

	await user.save({ validateBeforeSave: false });

	try {
		// const resetURL = `${req.protocol}://${req.get(
		// 	"host"
		// )}/api/users/resetPassword/${resetToken}`;

        const resetURL = `https://vrdoor.netlify.app/resetPassword?resetToken=${resetToken}`;

		await new Email(user, resetURL).sendPasswordReset();

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		await user.save({ validateBeforeSave: false });

		res.status(500);
		throw new Error("There was an error sending the email. Try again later!");
	}
});

exports.resetPassword = asyncHandler(async (req, res) => {
	// 1) Get user based on the token
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
	});

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		res.status(400);
		throw new Error("Your token has expired or is invalid!");
	}

	user.userpass = req.body.userpass;
	user.passwordResetToken = undefined;

	await user.save();

	// 3) Update changedPasswordAt property for the user
	// 4) Log the user in, send JWT
	res.status(200).json({
		status: "success",
		user,
		message: "Password updated",
	});
});

exports.fetchData = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(400);
			throw new Error("User not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});

exports.updateUser = asyncHandler(async (req, res) => {
    console.log("CALEd");
	const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        // overwrite:true,
		new: true,
	});

	if (!doc) {
		res.status(404);
		throw new Error("No document found with that ID.");
	}

	res.status(200).json(doc);
});