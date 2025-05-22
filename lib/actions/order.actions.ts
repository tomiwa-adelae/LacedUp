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
import { DEFAULT_LIMIT } from "@/constants";

import Mailjet from "node-mailjet";
import { OrderConfirmationEmail } from "@/templates/order-confirmation-email";
import { NewOrderAlert } from "@/templates/new-order-alert";
import { OrderDelivered } from "@/templates/order-delivered";
import { PaymentSuccess } from "@/templates/payment-success";
import { OrderCancellation } from "@/templates/order-cancellation";

const mailjet = Mailjet.apiConnect(
	process.env.MAILJET_API_PUBLIC_KEY!,
	process.env.MAILJET_API_PRIVATE_KEY!
);

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
				message: "Order not successful. Please try again later",
			};

		// **Send order confirmation email to customer**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: user.email,
							Name: `${user.firstName} ${user.lastName}`,
						},
					],
					Subject: `Order confirmation - LacedUp.`,
					TextPart: `Order confirmation - LacedUp. `,
					HTMLPart: OrderConfirmationEmail({
						name: `${user.firstName} ${user.lastName}`,
						email: user.email,
						orderId: newOrder._id,
						items: newOrder.orderItems,
						totalPrice,
						address: `${newOrder.shippingDetails.address}, ${newOrder.shippingDetails.city}, ${newOrder.shippingDetails.state}`,
					}),
				},
			],
		});
		// **Send new order alert to admin**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: process.env.ADMIN_EMAIL_ADDRESS,
							Name: `${process.env.COMPANY_NAME} Admin`,
						},
					],
					Subject: `New order alert - LacedUp.`,
					TextPart: `New order alert - LacedUp. `,
					HTMLPart: NewOrderAlert({
						name: `${user.firstName} ${user.lastName}`,
						email: user.email,
						orderId: newOrder._id,
						items: newOrder.orderItems,
						totalPrice,
						address: `${newOrder.shippingDetails.address}, ${newOrder.shippingDetails.city}, ${newOrder.shippingDetails.state}`,
					}),
				},
			],
		});

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

export const getAllOrders = async ({
	query,
	limit = DEFAULT_LIMIT,
	page,
	userId,
}: {
	query: string;
	limit: number;
	page: string;
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

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User can not be found. Please try again later",
			};

		const regexQuery = new RegExp(query, "i");

		const keyword: any = user.isAdmin
			? {
					$or: [
						{ "shippingDetails.firstName": regexQuery },
						{ "shippingDetails.lastName": regexQuery },
						{ "shippingDetails.email": regexQuery },
						{ "shippingDetails.phoneNumber": regexQuery },
						{ "orderItems.name": regexQuery },
						{ orderStatus: regexQuery },
						{ paymentStatus: regexQuery },
					],
			  }
			: {
					user: userId,
					$or: [
						{ "shippingDetails.firstName": regexQuery },
						{ "shippingDetails.lastName": regexQuery },
						{ "shippingDetails.email": regexQuery },
						{ "shippingDetails.phoneNumber": regexQuery },
						{ "orderItems.name": regexQuery },
						{ orderStatus: regexQuery },
						{ paymentStatus: regexQuery },
					],
			  };

		const skip = (parseInt(page || "1") - 1) * limit;

		// let orders;

		// if (user.isAdmin) {
		// 	orders = await Order.find()
		// 		.sort({ createdAt: -1 })
		// 		.populate("user");
		// } else {
		// 	orders = await Order.find({ user: userId })
		// 		.sort({ createdAt: -1 })
		// 		.populate("user");
		// }
		// return {
		// 	status: 200,
		// 	orders: JSON.parse(JSON.stringify(orders)),
		// };

		const orders = await Order.find({ ...keyword })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.populate("user", "name email");

		const orderCount = await Order.countDocuments({ ...keyword });

		return {
			status: 200,
			orders: JSON.parse(JSON.stringify(orders)),
			totalPages: Math.ceil(orderCount / limit),
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

		const order = await Order.findById(orderId).populate("user");

		if (!order)
			return {
				status: 400,
				message: "Oops! Order can not be found. Please try again later",
			};

		order.isPaid = details.isPaid || order.isPaid;
		order.orderStatus = details.orderStatus || order.orderStatus;
		order.paymentStatus = details.paymentStatus || order.paymentStatus;

		await order.save();

		// **Send order confirmation email to customer**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: user.email,
							Name: `${user.firstName} ${user.lastName}`,
						},
					],
					Subject: `Order delivered - LacedUp.`,
					TextPart: `Order delivered - LacedUp. `,
					HTMLPart: OrderDelivered({
						name: `${order.user.firstName} ${order.user.lastName}`,
						orderId: order._id,
						items: order.orderItems,
						totalPrice: order.totalPrice,
					}),
				},
			],
		});

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
					"Oops! OrderId can not be found. Please try again later",
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

		await order.save();

		// **Send order payment success email to customer**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: user.email,
							Name: `${user.firstName} ${user.lastName}`,
						},
					],
					Subject: `Payment successful - LacedUp.`,
					TextPart: `Payment successful - LacedUp. `,
					HTMLPart: PaymentSuccess({
						paymentId: order.paymentResult.id,
						orderId: order._id,
						items: order.orderItems,
						totalPrice: order.totalPrice,
					}),
				},
			],
		});

		revalidatePath(`/orders/${orderId}`);
		revalidatePath(`/orders`);
		return {
			status: 200,
			message: "Order payment updated successfully.",
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

// Cancel order
export const cancelOrder = async ({
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

		if (!orderId) {
			return {
				status: 400,
				message:
					"Oops! OrderId can not be found. Please try again later",
			};
		}

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User can not be found. Please try again later",
			};

		const order = await Order.findOne({
			_id: orderId,
			user: userId,
		}).populate("user");

		if (!order)
			return {
				status: 400,
				message: "Oops! Order can not be found. Please try again later",
			};

		order.orderStatus = OrderStatus.CANCELLED;
		order.paymentStatus = PaymentStatus.FAILED;

		await order.save();

		// **Send order cancellation email to customer**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: user.email,
							Name: `${user.firstName} ${user.lastName}`,
						},
					],
					Subject: `Order cancellation - LacedUp.`,
					TextPart: `Order cancellation - LacedUp. `,
					HTMLPart: OrderCancellation({
						orderId: order._id,
						items: order.orderItems,
						totalPrice: order.totalPrice,
						name: `${order.user.firstName} ${order.user.lastName}`,
					}),
				},
			],
		});

		revalidatePath(`/orders/${orderId}`);
		revalidatePath(`/orders`);

		return {
			status: 200,
			message: "Order successfully cancelled.",
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
