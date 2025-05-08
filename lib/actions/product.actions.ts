"use server";

import { connectToDatabase } from "../database";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createNewProduct = async (details: CreateNewProductParams) => {
	try {
		await connectToDatabase();

		console.log(details);

		if (!details.userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const user = await User.findById(details.userId);

		// console.log("Testsing");
		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to create this product.",
			};

		const product = await Product.create(details);

		console.log(product);

		// if (!product)
		// 	return {
		// 		status: 400,
		// 		message: "Product was not created. Try again later",
		// 	};

		// return {
		// 	status: 201,
		// 	message: "Success.",
		// 	product: JSON.parse(JSON.stringify(product)),
		// };
	} catch (error: any) {
		// handleError(error);
		// return {
		// 	status: error?.status || 400,
		// 	message:
		// 		error?.message || "Oops! Couldn't get user! Try again later.",
		// };
		console.log(error);
	}
};
