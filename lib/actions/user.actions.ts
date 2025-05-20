"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { DEFAULT_LIMIT } from "@/constants";

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
export const getCustomers = async ({
	query,
	limit = DEFAULT_LIMIT,
	page,
	userId,
}: {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		const keyword = query
			? {
					$or: [
						{
							firstName: {
								$regex: query,
								$options: "i",
							},
						},
						{
							lastName: {
								$regex: query,
								$options: "i",
							},
						},
						{
							email: {
								$regex: query,
								$options: "i",
							},
						},
						{
							phoneNumber: {
								$regex: query,
								$options: "i",
							},
						},
						{
							address: {
								$regex: query,
								$options: "i",
							},
						},
						{
							state: {
								$regex: query,
								$options: "i",
							},
						},
						{
							city: {
								$regex: query,
								$options: "i",
							},
						},
					],
			  }
			: {};

		if (!userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const skipAmount = (Number(page) - 1) * limit;

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

		const customers = await User.find({ _id: { $ne: userId }, ...keyword })
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount);

		const userCount = await User.countDocuments({
			_id: { $ne: userId },
			...keyword,
		});

		return {
			status: 200,
			customers: JSON.parse(JSON.stringify(customers)),
			totalPages: Math.ceil(userCount / limit),
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
