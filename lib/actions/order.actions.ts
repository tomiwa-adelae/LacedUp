"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Order, {
	OrderStatus,
	PaymentStatus,
} from "../database/models/order.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Product from "../database/models/product.model";

export const createOrder = async (details: any) => {
	try {
		await connectToDatabase();

		if (!details.user) {
			return {
				status: 400,
				message:
					"Oops! UserId can not be found. Please try again later",
			};
		}

		const user = await User.findById(details.user);

		if (!user)
			return {
				status: 400,
				message: "User not found.",
			};

		// Validate products and check inventory
		for (const item of details.orderItems) {
			const product = await Product.findById(item.product);

			if (!product) {
				throw new Error(`Product not found: ${item.product}`);
			}

			// Reduce product inventory
			product.totalOrders += 1;
			await product.save();
		}

		// Calculate total prices
		const itemsPrice = details.orderItems.reduce(
			(total: any, item: any) => total + item.price * item.quantity,
			0
		);

		const shippingPrice = details.shippingPrice; // Fixed shipping or dynamic calculation

		const totalPrice = itemsPrice + shippingPrice;

		const newOrder = await Order.create({
			user: details.user,
			orderItems: details.orderItems,
			shippingDetails: details.shippingDetails,
			paymentMethod: details.paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice,
			orderStatus: OrderStatus.PENDING,
			paymentStatus: PaymentStatus.PENDING,
		});

		if (!newOrder)
			return {
				status: 400,
				message: "Order not created. Please try again later",
			};

		return {
			status: 201,
			order: JSON.parse(JSON.stringify(newOrder)),
			message: "Order has been successfully created.",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't create order! Try again later.",
		};
	}
};

// Get order details
export const getOrderDetails = async ({
	userId,
	orderId,
}: {
	userId: string;
	orderId: string;
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
				message: "Oops! User can not be found. Please try again later",
			};

		if (!orderId) {
			return {
				status: 400,
				message:
					"Oops! OrderId can not be found. Please try again later",
			};
		}

		const order = await Order.findById(orderId).populate("user");

		if (!order) return { status: 400, message: "Order was not found." };

		return {
			status: 200,
			order: JSON.parse(JSON.stringify(order)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get order! Try again later.",
		};
	}
};

export const getAllOrders = async (userId: string) => {
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

		let orders;

		if (user.isAdmin) {
			orders = await Order.find()
				.sort({ createdAt: -1 })
				.populate("user");
		} else {
			orders = await Order.find({ user: userId })
				.sort({ createdAt: -1 })
				.populate("user");
		}
		return {
			status: 200,
			orders: JSON.parse(JSON.stringify(orders)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get order! Try again later.",
		};
	}
};

export const adminUpdateOrderDetails = async ({
	userId,
	orderId,
	details,
}: {
	userId: string;
	orderId: string;
	details: any;
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

		if (!orderId) {
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

		const order = await Order.findById(orderId);

		if (!order)
			return {
				status: 400,
				message: "Oops! Order can not be found. Please try again later",
			};

		order.isPaid = details.isPaid || order.isPaid;
		order.orderStatus = details.orderStatus || order.orderStatus;
		order.paymentStatus = details.paymentStatus || order.paymentStatus;

		await order.save();

		revalidatePath(`/orders/${orderId}`);
		revalidatePath("/orders");
		revalidatePath("/dashboard");

		return {
			status: 200,
			message: "Order successfully updated.",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get order! Try again later.",
		};
	}
};

// Update order details
export const updateOrder = async ({
	userId,
	orderId,
	details,
}: {
	userId: string;
	orderId: string;
	details: {
		id?: string;
		status?: string;
		update_time?: string;
		email_address?: string;
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

		if (!orderId) {
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

		const order = await Order.findById(orderId);

		if (!order)
			return {
				status: 400,
				message: "Oops! Order can not be found. Please try again later",
			};

		// Update payment details
		order.paymentResult = {
			id: details.id,
			status: details.status,
			update_time: details.update_time,
			email_address: details.email_address,
		};

		order.isPaid = true;
		order.paidAt = new Date();
		order.paymentStatus = PaymentStatus.PAID; // Or use PaymentStatus.PAID if you're importing the enum

		const updatedOrder = await order.save();
		revalidatePath(`/order/${orderId}`);
		return {
			status: 200,
			message: "Order payment updated successfully.",
			order: JSON.parse(JSON.stringify(updatedOrder)),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get order! Try again later.",
		};
	}
};
