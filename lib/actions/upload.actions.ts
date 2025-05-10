"use server";
import { v2 as cloudinary } from "cloudinary";
import { handleError } from "../utils";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async (images: string[]) => {
	try {
		const uploadPromises = images.map((image) => {
			const isImage =
				image.startsWith("data:image/jpeg") ||
				image.startsWith("data:image/png") ||
				image.startsWith("data:image/jpg") ||
				image.startsWith("data:image/gif") ||
				image.startsWith("data:image/webp");

			const isPDF = image.startsWith("data:application/pdf");

			return cloudinary.uploader.upload(image, {
				folder: "lacedup",
				resource_type: isImage || isPDF ? "image" : "raw",
			});
		});

		const results = await Promise.all(uploadPromises);

		return results.map((result) => ({
			url: result.secure_url,
			id: result.public_id,
		}));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't upload the images! Try again later.",
		};
	}
};

export const deleteImages = async (images: { id: string }[]) => {
	try {
		const deletePromises = images.map((item) =>
			cloudinary.uploader.destroy(item.id, {
				resource_type: "image", // or "auto" if you're unsure
			})
		);

		const results = await Promise.all(deletePromises);
		return results; // You can return this to check which deletions succeeded/failed
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't delete the images. Try again later.",
		};
	}
};

export const uploadImage = async (image: any) => {
	try {
		if (
			image.startsWith("data:application/pdf") ||
			image.startsWith("data:image/jpeg") ||
			image.startsWith("data:image/png") ||
			image.startsWith("data:image/jpg") ||
			image.startsWith("data:image/gif") ||
			image.startsWith("data:image/webp")
		) {
			const result = await cloudinary.uploader.upload(image, {
				folder: "lacedup",
			});

			return { url: result.secure_url, id: result.public_id };
		} else {
			const result = await cloudinary.uploader.upload(image, {
				folder: "lacedup",
				resource_type: "raw",
			});

			return { url: result.secure_url, id: result.public_id };
		}
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't upload the image! Try again later.",
		};
	}
};
