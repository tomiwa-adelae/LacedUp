import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.actions";

export async function POST(request: Request) {
	try {
		// Get the headers
		const headerPayload = await headers();
		const svix_id = headerPayload.get("svix-id");
		const svix_timestamp = headerPayload.get("svix-timestamp");
		const svix_signature = headerPayload.get("svix-signature");

		// If there are no headers, error out
		if (!svix_id || !svix_timestamp || !svix_signature) {
			return new Response("Error occured -- no svix headers", {
				status: 400,
			});
		}

		const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

		if (!WEBHOOK_SECRET) {
			throw new Error(
				"Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
			);
		}

		// Get the body
		const payload = await request.text();

		// Create a new Svix instance with your secret
		const wh = new Webhook(WEBHOOK_SECRET);

		let evt: WebhookEvent;

		// Verify the payload with the headers
		try {
			evt = wh.verify(payload, {
				"svix-id": svix_id,
				"svix-timestamp": svix_timestamp,
				"svix-signature": svix_signature,
			}) as WebhookEvent;
		} catch (err) {
			console.error("Error verifying webhook:", err);
			return new Response("Error verifying webhook", { status: 400 });
		}

		// Handle the webhook
		if (evt.type === "user.created") {
			const { id, email_addresses, image_url, first_name, last_name } =
				evt.data;

			const user = {
				clerkId: id,
				email: email_addresses[0].email_address,
				firstName: first_name,
				lastName: last_name,
				picture: image_url,
			};

			await createUser(user);
		}

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
