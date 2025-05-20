"use server";

import { generateNewsLetterEmail } from "@/templates/newsletter-email";
import { connectToDatabase } from "../database";
import NewsLetter from "../database/models/newsletter.model";
import { extractNameFromEmail, handleError } from "../utils";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
	process.env.MAILJET_API_PUBLIC_KEY!,
	process.env.MAILJET_API_PRIVATE_KEY!
);

export const addNewsLetter = async (email: string) => {
	try {
		await connectToDatabase();

		if (!email) {
			return {
				status: 400,
				message:
					"Oops! Email address can not be found. Please try again later",
			};
		}

		const emailExist = await NewsLetter.findOne({ email });

		if (emailExist) {
			return {
				status: 400,
				message:
					"Oops! You are already on our list. Check your inbox or spam",
			};
		}

		const newsLetter = await NewsLetter.create({ email });

		if (!newsLetter)
			return {
				status: 400,
				message: "Your email address was not saved. Try again later",
			};

		// **Send success Email to user**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: email,
							Name: extractNameFromEmail(email),
						},
					],
					Subject: `You're Officially LacedUp! `,
					TextPart: `You're Officially LacedUp! `,
					HTMLPart: generateNewsLetterEmail(),
				},
			],
		});

		return {
			status: 201,
			message:
				"You are successfully added to newsletter. Please check your inbox or spam",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't add newsletter! Try again later.",
		};
	}
};
