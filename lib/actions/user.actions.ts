"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Register user
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		const newUser = await User.create(user);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

// Get user details

export const getUserInfo = async (clerkId: string) => {
	try {
		await connectToDatabase();

		if (!clerkId)
			return {
				status: 400,
				message: "Oops! ClerkID not found.",
			};

		const user = await User.findOne({ clerkId });

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		return { status: 200, user: JSON.parse(JSON.stringify(user)) };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};

// Update user details
export const updateUser = async ({
	userId,
	details,
}: {
	userId: string;
	details: any;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		user.firstName = details.firstName || user.firstName;
		user.lastName = details.lastName || user.lastName;
		user.phoneNumber = details.phoneNumber || user.phoneNumber;
		user.picture = details.picture || user.picture;
		user.pictureId = details.pictureId || user.pictureId;
		user.bio = details.bio || user.bio;
		user.address = details.address || user.address;
		user.state = details.state || user.state;
		user.city = details.city || user.city;
		user.country = details.country || user.country;

		await user.save();

		revalidatePath(`/settings`);
		revalidatePath(`/dashboard`);

		return { status: 201, message: `Successfully updated your details` };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};

// Get all customers by admin
export const getCustomers = async ({ userId }: { userId: string }) => {
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
				message: "Oops! User can not be found. Please try again later",
			};

		if (!user.isAdmin)
			return {
				status: 400,
				message:
					"Oops! You are not authorized to make this update. Please try again later",
			};

		const customers = await User.find({ _id: { $ne: userId } }).sort({
			createdAt: -1,
		});

		return {
			status: 200,
			customers: JSON.parse(JSON.stringify(customers)),
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
