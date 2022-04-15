const asyncHandler = require("express-async-handler");
// var bcrypt = require("bcryptjs");
const { Property } = require("../model/propertiesModel");
const mongoose=require("mongoose")
exports.addProperty = asyncHandler(async (req, res) => {
    // var id = mongoose.Types.ObjectId("4edd40c86762e0fb12000003");

	const {
        userId,
		title,
		propertyImage,
		overview,
		price,
		beds,
		baths,
		sqft,
		type,
		category,
		builtYear,
		parkingSpaces,
		roomCount,
		location,
		tvCable,
		barbeque,
		ac,
		lawn,
		laundry,
		ccCam,
		feel_360,
        status
	} = req.body;



    const Data = [
			{
				// id: 1,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property1.jpg",
				type: "Apartment",
				title: "2nd Floor DDA Flat",
				location: "Rohin Sec-7, New Delhi",
				beds: 3,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 2,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property21.jpg",
				type: "Family House",
				title: "Family House in Dwarka",
				location: "Dwarka, New Delhi",
				beds: 4,
				baths: 3,
				sqft: 931,
			},
			{
				// id: 3,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property3.jpg",
				type: "Family House",
				title: "Family House in Rohini Sec-3",
				location: "Rohini, New Delhi",
				beds: 3,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 4,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property4.jpg",
				type: "Apartment",
				title: "1st Floor Apartment in Pitampura",
				location: "Pitampura, New Delhi",
				beds: 2,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 5,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property5.jpg",
				type: "Family House",
				title: "Noida Villa for Sale",
				location: "Greater Noida, Uttar Pradesh",
				beds: 5,
				baths: 4,
				sqft: 931,
			},
			{
				// id: 6,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property6.jpg",
				type: "Apartment",
				title: "3rd Floor, Pragati Apartment, West Enclave",
				location: "West Enclave, New Delhi",
				beds: 3,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 7,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property7.jpg",
				type: "Family House",
				title: "West Enclave C1/C2 House",
				location: "West Enclave, New Delhi",
				beds: 5,
				baths: 5,
				sqft: 931,
			},
			{
				// id: 8,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property8.jpg",
				type: "Apartment",
				title: "2nd Floor at Karol Bagh",
				location: "Karol Bagh, New Delhi",
				beds: 2,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 9,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property9.jpg",
				type: "Apartment",
				title: "1 BHK Apartment for Rent",
				location: "GTB Nagar, New Delhi",
				beds: 1,
				baths: 1,
				sqft: 931,
			},
			{
				// id: 10,
				category: "Rent",
				price: 15000,
				propertyImage: "img/blog/property10.jpg",
				type: "Apartment",
				title: "Moti Nagar 3 BHK 2nd Floor",
				location: "Moti Nagar, New Delhi",
				beds: 3,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 11,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property23.jpg",
				type: "Apartment",
				title: "Duplex in Rohini Sec-24",
				location: "Rohini, Sector-24, New Delhi",
				beds: 3,
				baths: 2,
				sqft: 931,
			},
			{
				// id: 12,
				category: "Buy",
				price: 15000,
				propertyImage: "img/blog/property22.jpg",
				type: "Apartment",
				title: "Mukherjee Nagar House for sale",
				location: "Mukherjee Nagar, New Delhi",
				beds: 4,
				baths: 3,
				sqft: 931,
			},
		];

        // const properties=Data.map((property)=>{return{...property}})
        // const checkProp=await Property.insertMany(properties);
        // if(checkProp){
        //     res.json("added")
        // }
	// console.log(req.body, "user");

	try {
		const newProperty = await  Property.create({
            userId:mongoose.Types.ObjectId(userId),
			title: title,
			propertyImage: propertyImage,
			overview: overview,
			price: price,
			category: category,
			beds: beds,
			baths: baths,
			sqft: sqft,
			type: type,
			status: status,
			builtYear: builtYear,
			parkingSpaces: parkingSpaces,
			roomCount: roomCount,
			location: location,
			tvCable: tvCable,
			barbeque: barbeque,
			ac: ac,
			lawn: lawn,
			laundry: laundry,
			ccCam: ccCam,
			feel_360: feel_360,
		});
        console.log(newProperty);
		// newProperty.save(() => {
		// 	console.log("saved");
		// });
		if (newProperty) {
			res.status(200).json(newProperty);
		} else {
			res.status(400);
			throw new Error("Property not found");
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

exports.getProperty = asyncHandler(async (req, res) => {
    const val = req.params.category.charAt(0).toUpperCase()+req.params.category.slice(1)
    console.log(val);
	try {
		const properties = await Property.find({category:val});
		if (properties) {
			res.status(200).json(properties);
		} else {
			res.status(400);
			throw new Error("Properties not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});


exports.getPropertyByUserId = asyncHandler(async (req, res) => {

	try {
		const properties = await Property.find({
			userId:req.params.id,
		});
        console.log(properties,"SEND");
		if (properties) {
			res.json(properties);
		} else {
			res.status(400);
			throw new Error("Properties not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});

exports.updateProperty = asyncHandler(async (req, res) => {
  const doc = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,    
  });

  if (!doc) {
    res.status(404);
    throw new Error("No document found with that ID.");    
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
})

exports.deleteProperty = asyncHandler(async (req, res) => {
  const doc = await Property.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404);
      throw new Error("No document found with that ID.");
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
})

exports.getPropertyDetailsById = asyncHandler(async (req, res) => {
	try {
		const properties = await Property.findOne({
			_id: req.params.id,
		});
		console.log(properties, "SEND");
		if (properties) {
			res.json(properties);
		} else {
			res.status(400);
			throw new Error("Properties not found");
		}
	} catch (e) {
		res.status(400);

		throw new Error(e.message);
	}
});