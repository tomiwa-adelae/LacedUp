import { Document, Schema, Types, model, models } from "mongoose";

// Enum for order status
export enum OrderStatus {
	PENDING = "pending",
	PROCESSING = "processing",
	SHIPPED = "shipped",
	DELIVERED = "delivered",
	CANCELLED = "cancelled",
	REFUNDED = "refunded",
}

// Enum for payment status
export enum PaymentStatus {
	PENDING = "pending",
	PAID = "paid",
	FAILED = "failed",
	REFUNDED = "refunded",
}

// Enum for payment methods
export enum PaymentMethod {
	CREDIT_CARD = "card",
	BANK_TRANSFER = "bank_transfer",
	CASH_ON_DELIVERY = "cash_on_delivery",
}

// Define the TypeScript interface for the Order document

// TypeScript interface for type safety
export interface IOrder extends Document {
	user: Types.ObjectId;
	orderItems: {
		product: Types.ObjectId;
		name: string;
		price: number;
		quantity: number;
		size: string;
		color: string;
		image: string;
	}[];
	shippingDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		address: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
	};
	paymentMethod: PaymentMethod;
	paymentResult?: {
		id?: string;
		status?: string;
		update_time?: string;
		email_address?: string;
	};
	itemsPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt?: Date;
	orderStatus: OrderStatus;
	paymentStatus: PaymentStatus;
	deliveredAt?: Date;
	totalQuantity: number;
	createdAt: Date;
	updatedAt: Date;
}

export const OrderItemSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "Quantity must be at least 1"],
	},
	size: {
		type: String,
		required: true,
	},
	color: {
		type: String,
	},
	image: {
		type: String,
		required: true,
	},
});

const ShippingDetailsSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	state: {
		type: String,
		required: true,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		default: "Nigeria",
		trim: true,
	},
	postalCode: {
		type: String,
		required: true,
		trim: true,
	},
});

// Define Mongoose Schema with Type Safety
const OrderSchema = new Schema<IOrder>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderItems: [OrderItemSchema],
		shippingDetails: {
			type: ShippingDetailsSchema,
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: Object.values(PaymentMethod),
			required: true,
		},
		itemsPrice: {
			type: Number,
			required: true,
			min: [0, "Total price must be positive"],
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		totalPrice: {
			type: Number,
			required: true,
			min: [0, "Total price must be positive"],
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		orderStatus: {
			type: String,
			enum: Object.values(OrderStatus),
			default: OrderStatus.PENDING,
		},
		paymentStatus: {
			type: String,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Virtual to calculate the number of items in the order
OrderSchema.virtual("totalQuantity").get(function () {
	return this.orderItems.reduce((total, item) => total + item.quantity, 0);
});

// Middleware to validate total price before saving
OrderSchema.pre("save", function (next) {
	// Calculate total price
	const itemsTotal = this.orderItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	// Ensure calculated total matches the stored total price
	if (Math.abs(itemsTotal - this.itemsPrice) > 0.01) {
		this.itemsPrice = itemsTotal;
	}

	// Recalculate total price with tax and shipping
	this.totalPrice = this.itemsPrice + this.shippingPrice;

	next();
});

// Create and export the Order model with Type Safety
const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
