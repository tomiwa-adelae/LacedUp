"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";

// export const addToCart = async () => {
// 	try {
// 		await connectToDatabase();
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't get product! Try again later.",
// 		};
// 	}
// };
