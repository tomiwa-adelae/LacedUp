import { Document, Schema, model, models } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
	name: string;
	picture: string;
	pictureId: string;
	_id: string;
}

// Define the Category schema
const CategorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	picture: {
		type: String,
		required: true,
	},
	pictureId: {
		type: String,
		required: true,
	},
});

// Define the Category model
const Category =
	models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
