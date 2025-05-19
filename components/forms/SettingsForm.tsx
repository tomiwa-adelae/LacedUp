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
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { updateUser } from "@/lib/actions/user.actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { nigerianStates } from "@/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

interface Props {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	picture: string;
	state: string;
	address: string;
	city: string;
	country: string;
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

export function SettingsForm({
	userId,
	firstName,
	lastName,
	email,
	phoneNumber,
	picture,
	city,
	address,
	state,
	country,
}: Props) {
	const router = useRouter();

	const [openImageModal, setOpenImageModal] = useState<boolean>(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: firstName || "",
			lastName: lastName || "",
			email: email || "",
			phoneNumber: phoneNumber || "",
			address: address || "",
			state: state || "",
			city: city || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const details = { ...data, country: "Nigeria" };

			const res = await updateUser({ details, userId });

			if (res?.status === 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});

			router.push("/dashboard");
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

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
			<Separator className="my-8" />
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
												placeholder="Enter your first name"
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
												placeholder="Enter your last name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
									<FormControl>
										<Input
											type="email"
											disabled
											placeholder="Enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<PhoneInput
											placeholder="Enter phone number"
											value={field.value}
											defaultCountry="NG"
											className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 sm:text-sm text-base"
											onChange={(phone) => {
												field.onChange(phone);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Separator className="my-8" />
						<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
							Shipping details
						</h4>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Home address</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your home address"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your state" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{nigerianStates.map(
													(state, index) => (
														<SelectItem
															key={index}
															value={state}
														>
															{state}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your city"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							disabled={form.formState.isSubmitting}
							size="lg"
							type="submit"
						>
							{form.formState.isSubmitting
								? "Updating..."
								: "Update profile"}
						</Button>
					</form>
				</Form>
			</div>
			<div className="mt-8">
				<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
					Shipping details
				</h4>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 mt-8"
					></form>
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
