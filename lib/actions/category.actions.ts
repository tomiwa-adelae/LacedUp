"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";
import { uploadImage } from "./upload.actions";

export const getAllCategories = async () => {
	try {
		await connectToDatabase();

		const categories = await Category.find().sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(categories));
	} catch (error) {
		handleError(error);
	}
};

export const getCategoryByName = async (name: string) => {
	return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export const getCategoryDetails = async (id: string) => {
	try {
		await connectToDatabase();

		const category = await Category.findById(id);

		if (!category)
			return {
				status: 400,
				message: "Could not find the category. Try again later",
			};

		return { status: 200, category: JSON.parse(JSON.stringify(category)) };
	} catch (error) {
		handleError(error);
	}
};

export const createCategory = async ({
	name,
	image,
}: {
	name: string;
	image: string;
}) => {
	try {
		await connectToDatabase();

		const uploadResult = await uploadImage(image);

		const newCategory = await Category.create({
			name,
			picture: uploadResult.url,
			pictureId: uploadResult.id,
		});

		revalidatePath(`/products/new`);

		return {
			category: JSON.parse(JSON.stringify(newCategory)),
			message:
				"You have created a new category. Now add it to your product",
		};
	} catch (error) {
		handleError(error);
	}
};
