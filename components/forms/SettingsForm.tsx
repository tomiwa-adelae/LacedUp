"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ProfileImageModal } from "../ProfileImageModal";

interface Props {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	picture: string;
}

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z
		.string({ required_error: "Email is required." })
		.email("Invalid email address."),
});

export function SettingsForm({
	userId,
	firstName,
	lastName,
	email,
	phoneNumber,
	picture,
}: Props) {
	const [openImageModal, setOpenImageModal] = useState<boolean>(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {}

	return (
		<div>
			<div className="flex items-center justify-start gap-4">
				<Image
					src={picture}
					alt={`${firstName} ${lastName}'s picture`}
					width={1000}
					height={1000}
					className="rounded-full object-cover size-32"
				/>
				<div>
					<h4 className="text-lg font-semibold">Profile picture</h4>
					<p className="text-muted-foreground text-xs mb-2">
						PNG, JPG up to 5MB
					</p>
					<Button
						className="text-primary"
						size="sm"
						variant={"ghost"}
						onClick={() => setOpenImageModal(true)}
					>
						Update
					</Button>
				</div>
			</div>
			<div className="mt-8">
				<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
					Details
				</h4>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 mt-8"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												placeholder="shadcn"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												placeholder="shadcn"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="shadcn"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button size="lg" type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</div>
			{openImageModal && (
				<ProfileImageModal
					open={openImageModal}
					closeModal={() => {
						setOpenImageModal(false);
					}}
					userId={userId}
				/>
			)}
		</div>
	);
}
