import { Document, Schema, model, models } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
	name: string;
	_id: string;
}

// Define the Category schema
const CategorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

// Define the Category model
const Category =
	models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
