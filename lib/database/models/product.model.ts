import { Document, Schema, Types, model, models } from "mongoose";

export interface IMedia {
	url?: string;
	id?: string;
}

export interface IAvailableColor {
	name: string;
	colorCode: string;
}

export interface ITags {
	name: string;
}

export interface IProduct extends Document {
	user: Types.ObjectId;
	category?: Types.ObjectId;
	tags?: Types.ObjectId;
	name: string;
	description: string;
	availableColors: IAvailableColor[];
	media: IMedia[];
	price: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const MediaSchema = new Schema<IMedia>({
	url: {
		type: String,
		required: false,
	},
	id: {
		type: String,
		required: false,
	},
});

const TagsSchema = new Schema<ITags>({
	name: {
		type: String,
		required: false,
	},
});

const AvailableColorsSchema = new Schema<IAvailableColor>({
	name: {
		type: String,
		required: false,
	},
	colorCode: {
		type: String,
		required: false,
	},
});

// Define Mongoose Schema with Type Safety
const ProductSchema = new Schema<IProduct>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		tags: {
			type: [TagsSchema],
			default: [],
		},
		name: {
			type: String,
			required: true,
		},
		availableColors: {
			type: [AvailableColorsSchema],
			default: [],
		},
		media: {
			type: [MediaSchema],
			default: [],
		},
		price: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Create and export the Product model with Type Safety
const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
