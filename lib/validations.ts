import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const WaitlistFormSchema = z.object({
	email: z
		.string({ required_error: "Email is required." })
		.email("Invalid email address."),
});

export const ProductFormSchema = z.object({
	name: z.string().min(2, { message: "Name is required." }),
	description: z.string().min(10, { message: "Description is required." }),
	category: z.string().min(2, { message: "Category is required." }),
	price: z.string().min(2, { message: "Price is required." }),
	media: z
		.array(z.string().url("Each media must be a valid URL"))
		.nonempty("At least one media item is required"),
});

export const SettingsFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z
		.string({ required_error: "Email is required." })
		.email("Invalid email address."),
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		})
		.optional(),
	state: z.string().optional(),
	city: z.string().optional(),
	address: z.string().optional(),
});

export const ShippingFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "last name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		}),
	state: z.string().min(2, { message: "Your state is required." }),
	city: z.string().min(2, { message: "Your city is required." }),
	address: z.string().min(2, { message: "Your address is required." }),
	postalCode: z.string().min(2, { message: "Your postal code is required." }),
});

export const PaymentFormSchema = z.object({
	paymentMethod: z.string({
		required_error: "You need to select a payment method.",
	}),
});

export const TagsFormSchema = z.object({
	tags: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});
