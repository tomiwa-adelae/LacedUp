import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the NewsLetter document
export interface INewsLetter extends Document {
	email: string;
}

// Define Mongoose Schema with Type Safety
const NewsLetterSchema = new Schema<INewsLetter>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Create and export the NewsLetter model with Type Safety
const NewsLetter =
	models.NewsLetter || model<INewsLetter>("NewsLetter", NewsLetterSchema);

export default NewsLetter;
