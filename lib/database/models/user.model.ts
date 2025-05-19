import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the User document
export interface IUser extends Document {
	clerkId: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	picture?: string;
	pictureId?: string;
	bio?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	createdAt?: Date;
	updatedAt?: Date;
	isAdmin?: boolean;
}

// Define Mongoose Schema with Type Safety
const UserSchema = new Schema<IUser>(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
		},
		picture: {
			type: String,
		},
		pictureId: {
			type: String,
		},
		bio: {
			type: String,
		},
		address: {
			type: String,
		},
		state: {
			type: String,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Create and export the User model with Type Safety
const User = models.User || model<IUser>("User", UserSchema);

export default User;
