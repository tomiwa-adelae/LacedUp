"use server";

import { connectToDatabase } from "../database";
import Shipping from "../database/models/shipping.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const saveShippingDetails = async ({
	userId,
	details,
}: {
	userId: string;
	details: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		state: string;
		city: string;
		address: string;
		postalCode: string;
	};
}) => {
	try {
		await connectToDatabase();

		if (!userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "User not found.",
			};

		const shippingDetails = await Shipping.create({
			user: userId,
			...details,
		});

		if (!shippingDetails) {
			return {
				status: 400,
				message:
					"Oops! Shipping details not saved. Please try again later",
			};
		}

		return {
			status: 201,
			message: "You have successfully saved your details.",
			product: JSON.parse(JSON.stringify(shippingDetails)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};

export const getShippingDetails = async (userId: string) => {
	try {
		await connectToDatabase();

		if (!userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "User not found.",
			};

		const shippingDetails = await Shipping.findOne({
			user: userId,
		});

		// if (!shippingDetails) {
		// 	return {
		// 		status: 400,
		// 		message:
		// 			"Oops! Shipping details not saved. Please try again later",
		// 	};
		// }

		return {
			status: 200,
			details: JSON.parse(JSON.stringify(shippingDetails)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};
