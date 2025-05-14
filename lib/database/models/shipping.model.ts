import { Document, Schema, model, models, Types } from "mongoose";

// Define the Shipping interface
export interface IShipping extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	user: Types.ObjectId;
}

// Define the Shipping schema
const ShippingSchema = new Schema<IShipping>({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	postalCode: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
});

// Define the Shipping model
const Shipping =
	models.Shipping || model<IShipping>("Shipping", ShippingSchema);

export default Shipping;
