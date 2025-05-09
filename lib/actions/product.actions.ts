"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { deleteImages, uploadImages } from "./upload.actions";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createNewProduct = async (details: CreateNewProductParams) => {
	try {
		await connectToDatabase();

		if (!details.userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const user = await User.findById(details.userId);

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to create this product.",
			};

		const uploadResponse = await uploadImages(details.media);

		const product = {
			user: details.userId,
			category: details.category,
			tags: details.tags,
			name: details.name,
			availableColors: details.availableColors,
			media: uploadResponse,
			price: details.price,
			description: details.description,
		};

		const newProduct = await Product.create(product);

		if (!newProduct)
			return {
				status: 400,
				message: "Product was not created. Try again later",
			};

		return {
			status: 201,
			message: "Success.",
			product: JSON.parse(JSON.stringify(newProduct)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get product! Try again later.",
		};
	}
};

// Get product details
export const getAdminProductDetails = async ({
	productId,
	userId,
}: {
	productId: string;
	userId: string;
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

		if (!productId) {
			return {
				status: 400,
				message:
					"Oops! ProductId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to get this product.",
			};

		const product = await Product.findById(productId).populate("category");

		if (!product)
			return {
				status: 400,
				message: "Oops! Product not found.",
			};

		return {
			status: 200,
			product: JSON.parse(JSON.stringify(product)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get product! Try again later.",
		};
	}
};

// Delete product by admin
export const deleteProduct = async ({
	productId,
	userId,
}: {
	productId: string;
	userId: string;
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

		if (!productId) {
			return {
				status: 400,
				message:
					"Oops! ProductId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to delete this product.",
			};

		const product = await Product.findById(productId);
		if (!product) {
			return {
				status: 400,
				message:
					"Oops! Product can not be found. Please try again later",
			};
		}

		// Delete images from cloudinary first
		await deleteImages(product.media);

		const deletedProduct = await Product.findByIdAndDelete(product);

		if (!deletedProduct)
			return {
				status: 400,
				message:
					"Oops! Product was not deleted. Please try again later",
			};

		revalidatePath("/products");
		revalidatePath("/dashboard");

		return {
			status: 201,
			message: `Product has been successfully deleted!`,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get product! Try again later.",
		};
	}
};

export const updateProduct = async ({
	productId,
	details,
}: UpdateProductParams) => {
	try {
		await connectToDatabase();

		if (!details.userId) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		if (!productId) {
			return {
				status: 400,
				message:
					"Oops! ProductId can not be found. Please try again later",
			};
		}

		const user = await User.findById(details.userId);

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to update this product.",
			};

		const product = await Product.findById(productId);
		if (!product) {
			return {
				status: 400,
				message:
					"Oops! Product can not be found. Please try again later",
			};
		}

		product.name = details.name || product.name;
		product.description = details.description || product.description;
		product.price = details.price || product.price;
		product.category = details.category || product.category;
		product.userId = details.userId || product.userId;
		product.availableColors =
			details.availableColors || product.availableColors;
		product.tags = details.tags || product.tags;

		if (details.media && details.media.length > 0) {
			const uploadResponse = await uploadImages(details.media);

			if (Array.isArray(uploadResponse)) {
				product.media = Array.isArray(product.media)
					? product.media
					: [];
				product.media = [...uploadResponse, ...product.media];
			} else {
				return {
					status: uploadResponse.status || 400,
					message:
						uploadResponse.message || "Failed to upload media.",
				};
			}
		}

		const updatedProduct = await product.save();

		revalidatePath(`/products/${productId}`);
		revalidatePath(`/products`);
		revalidatePath(`/shoes`);
		revalidatePath(`/`);
		revalidatePath(`/dashboard`);
		return {
			status: 200,
			message: "You have successfully update the product.",
			product: JSON.parse(JSON.stringify(updatedProduct)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get product! Try again later.",
		};
	}
};

// Delete product image by admin
export const deleteProductImage = async ({
	userId,
	productId,
	imageId,
}: {
	userId: string;
	productId: string;
	imageId: string;
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

		if (!productId) {
			return {
				status: 400,
				message:
					"Oops! ProductId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to delete this image.",
			};

		const product = await Product.findById(productId);
		if (!product) {
			return {
				status: 400,
				message:
					"Oops! Product can not be found. Please try again later",
			};
		}

		// Delete from cloudinary first
		await cloudinary.uploader.destroy(imageId, {});

		const oldImage = product.media.find(
			(img: any) => img.id.toString() === imageId
		);

		// Remove the old image from MongoDB
		const deletedImage = await Product.findByIdAndUpdate(
			product,
			{ $pull: { media: { id: oldImage.id } } }, // Remove the old image
			{ new: true }
		);

		if (!deletedImage)
			return {
				status: 400,
				message: "Oops! Image not deleted. Try again later.",
			};

		const updatedProduct = await Product.findById(productId);

		// revalidatePath(`/products/new?edit=true&id=${productId}`);
		revalidatePath(`/products/new`);
		revalidatePath(`/products/${productId}`);
		revalidatePath(`/products`);
		revalidatePath(`/shoes`);
		revalidatePath(`/`);
		revalidatePath(`/dashboard`);

		return {
			status: 200,
			message: `Successfully deleted!`,
			updatedMedia: JSON.parse(JSON.stringify(updatedProduct.media)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get product! Try again later.",
		};
	}
};

// Get all the products by admin
export const getAdminProducts = async ({ userId }: { userId: string }) => {
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

		if (!user && !user.isAdmin)
			return {
				status: 400,
				message: "You are not authorized to get these products.",
			};

		const products = await Product.find().populate("category");

		return {
			status: 200,
			products: JSON.parse(JSON.stringify(products)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get products! Try again later.",
		};
	}
};
