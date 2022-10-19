const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// register route
router.get("/", (req, res) => {
	res.render("ao/ao_dash.pug");
});

router.get("/members", (req, res) => {
	res.render("ao/members");
});

router.get("/gp", (req, res) => {
	res.render("ao/general_public_list");
});

router.get("/register", (req, res) => {
	res.render("ao/ao_registration");
});

// router.post("/register", (req, res) => {
// 	console.log(req.body);

// 	const user = new User(req.body);
// 	user.save();
// 	res.send(`<h1 style='text-align:center;margin-top:10%;font-size:70px'>Registered 😊</h1>`);
// });

router.post("/register", async (req, res) => {
	console.log(req.body);
	try {
		const user = new User(req.body);
		let uniqueExists = await User.findOne({ uniquenumber: req.body.uniquenumber });
		console.log(uniqueExists);

		if (uniqueExists) {
			return res
				.status(400)
				.send(
					"<h2 style='text-align:center;margin-top:200px;font-size:100px;'>User already Exists 😭</h2>"
				);
		} else {
			await User.register(user, req.body.password, (error) => {
				if (error) {
					throw error;
				}
				res.send(
					"<h1 style='text-align:center;margin-top:10%;font-size:70px'>Registered 😊</h1>"
				);
			});
		}
	} catch (error) {
		res.status(400).send(
			"<h2 style='text-align:center;margin-top:200px;font-size:100px;'>Something went wrong 🥹🥹🥹!</h1>"
		);
		console.log(error);
		// catch more errors.... registrationn with existing id
	}
});

// router.post("/register", (req, res) => {
// 	User.findOne({ uniquenumber: req.body.uniquenumber }).then((user) => {
// 		console.log(user);
// 		if (user) {
// 			return res
// 				.status(400)
// 				.send(
// 					"<h2 style='text-align:center;margin-top:200px;font-size:100px;'>Unique Number already Exists 😭</h2>"
// 				);
// 		} else {
// 			const newUser = new User(req.body);
// 			newUser.save();
// 			res.send(
// 				"<h1 style='text-align:center;margin-top:10%;font-size:70px'>Registered 😊</h1>"
// 			);
// 		}
// 	});
// });

router.get("/products", (req, res) => {
	res.render("ao/products");
});

module.exports = router;
