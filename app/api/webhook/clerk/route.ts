// // import { NextResponse } from "next/server";
// // import { headers } from "next/headers";
// // import { clerkClient } from "@clerk/clerk-sdk-node"; // ✅ updated import
// // import { WebhookEvent } from "@clerk/nextjs/server";
// // import { Webhook } from "svix";
// // import { createUser } from "@/lib/actions/user.actions";

// // export async function POST(req: Request) {
// // 	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
// // 	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// // 	if (!WEBHOOK_SECRET) {
// // 		throw new Error(
// // 			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
// // 		);
// // 	}

// // 	// Get the headers
// // 	const headerPayload = headers();
// // 	const svix_id = headerPayload.get("svix-id");
// // 	const svix_timestamp = headerPayload.get("svix-timestamp");
// // 	const svix_signature = headerPayload.get("svix-signature");

// // 	// If there are no headers, error out
// // 	if (!svix_id || !svix_timestamp || !svix_signature) {
// // 		return new Response("Error occurred -- no svix headers", {
// // 			status: 400,
// // 		});
// // 	}

// // 	// Get the body
// // 	const payload = await req.json();
// // 	const body = JSON.stringify(payload);

// // 	// Create a new Svix instance with your secret.
// // 	const wh = new Webhook(WEBHOOK_SECRET);

// // 	let evt: WebhookEvent;

// // 	// Verify the payload with the headers
// // 	try {
// // 		evt = wh.verify(body, {
// // 			"svix-id": svix_id,
// // 			"svix-timestamp": svix_timestamp,
// // 			"svix-signature": svix_signature,
// // 		}) as WebhookEvent;
// // 	} catch (err) {
// // 		console.error("Error verifying webhook:", err);
// // 		return new Response("Error occured", {
// // 			status: 400,
// // 		});
// // 	}

// // 	// Get the ID and type
// // 	const { id } = evt.data;
// // 	const eventType = evt.type;

// // 	if (eventType === "user.created") {
// // 		const { id, email_addresses, image_url, first_name, last_name } =
// // 			evt.data;

// // 		const user = {
// // 			clerkId: id,
// // 			email: email_addresses[0].email_address,
// // 			firstName: first_name,
// // 			lastName: last_name,
// // 			picture: image_url,
// // 		};

// // 		const newUser = await createUser(user);

// // 		if (newUser) {
// // 			await clerkClient.users.updateUserMetadata(id, {
// // 				publicMetadata: {
// // 					userId: newUser._id,
// // 				},
// // 			});
// // 		}

// // 		return NextResponse.json({ message: "OK", user: newUser });
// // 	}

// // 	if (eventType === "user.updated") {
// // 		const { id, image_url, first_name, last_name } = evt.data;

// // 		const user = {
// // 			firstName: first_name,
// // 			lastName: last_name,
// // 			picture: image_url,
// // 		};
// // 	}

// // 	if (eventType === "user.deleted") {
// // 		const { id } = evt.data;
// // 	}

// // 	return new Response("", { status: 200 });
// // }

// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { Webhook } from "svix";
// import type { WebhookEvent } from "@clerk/nextjs/server";
// import { createUser } from "@/lib/actions/user.actions";

// export async function POST(req: Request) {
// 	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// 	if (!WEBHOOK_SECRET) {
// 		throw new Error(
// 			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
// 		);
// 	}

// 	// Get the headers (must await in Next.js 14+)
// 	const headerPayload = await headers();
// 	const svix_id = headerPayload.get("svix-id");
// 	const svix_timestamp = headerPayload.get("svix-timestamp");
// 	const svix_signature = headerPayload.get("svix-signature");

// 	if (!svix_id || !svix_timestamp || !svix_signature) {
// 		return new Response("Missing Svix headers", { status: 400 });
// 	}

// 	const payload = await req.json();
// 	const body = JSON.stringify(payload);

// 	const wh = new Webhook(WEBHOOK_SECRET);

// 	let evt: WebhookEvent;
// 	try {
// 		evt = wh.verify(body, {
// 			"svix-id": svix_id,
// 			"svix-timestamp": svix_timestamp,
// 			"svix-signature": svix_signature,
// 		}) as WebhookEvent;
// 	} catch (err) {
// 		console.error("Webhook verification failed:", err);
// 		return new Response("Invalid signature", { status: 400 });
// 	}

// 	const eventType = evt.type;

// 	if (eventType === "user.created") {
// 		const { id, email_addresses, image_url, first_name, last_name } =
// 			evt.data;

// 		const user = {
// 			clerkId: id,
// 			email: email_addresses[0].email_address,
// 			firstName: first_name,
// 			lastName: last_name,
// 			picture: image_url,
// 		};

// 		console.log("YESSSS", user);

// 		const newUser = await createUser(user);

// 		if (newUser) {
// 			await clerkClient.users.updateUserMetadata(id, {
// 				publicMetadata: {
// 					userId: newUser._id,
// 				},
// 			});
// 		}

// 		return NextResponse.json({ message: "User created", user: newUser });
// 	}

// 	// Optionally handle other events like user.updated, user.deleted
// 	return new Response("Event received", { status: 200 });
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { clerkClient, type WebhookEvent } from "@clerk/nextjs/server";
// import { createUser } from "@/lib/actions/user.actions";

// export async function POST(request: Request) {
// 	try {
// 		const payload = await request.text();
// 		const headerPayload = await headers();
// 		const svixHeaders = {
// 			"svix-id": headerPayload.get("svix-id")!,
// 			"svix-timestamp": headerPayload.get("svix-timestamp")!,
// 			"svix-signature": headerPayload.get("svix-signature")!,
// 		};
// 		const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET || "");
// 		const evt = wh.verify(payload, svixHeaders) as WebhookEvent;

// 		// Handle the webhook
// 		if (evt.type === "user.created") {
// 			const { id, email_addresses, image_url, first_name, last_name } =
// 				evt.data;

// 			const user = {
// 				clerkId: id,
// 				email: email_addresses[0].email_address,
// 				firstName: first_name,
// 				lastName: last_name,
// 				picture: image_url,
// 			};

// 			const newUser = await createUser(user);

// 			if (newUser) {
// 				await clerkClient.users.updateUserMetadata(id, {
// 					publicMetadata: {
// 						userId: newUser._id,
// 					},
// 				});
// 			}
// 		}

// 		return new Response("Webhook received", { status: 200 });
// 	} catch (err) {
// 		console.error("Error verifying webhook:", err);
// 		return new Response("Error verifying webhook", { status: 400 });
// 	}
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";

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
