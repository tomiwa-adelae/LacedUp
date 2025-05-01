"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RequiredAsterisk } from "../shared/RequiredAsterisk";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { nigerianStates } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const FormSchema = z.object({
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
	termsAndCondition: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and conditions.",
	}),
});

export function ShippingForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								First name <RequiredAsterisk />
							</FormLabel>
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
							<FormLabel>
								Last name <RequiredAsterisk />
							</FormLabel>
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
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Email <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<Input
									type="email"
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
							<FormLabel>
								Phone Number <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<PhoneInput
									placeholder="Enter your phone number"
									value={field.value}
									onChange={(phone: any) => {
										field.onChange(phone);
									}}
									defaultCountry="NG"
									className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								State <RequiredAsterisk />
							</FormLabel>
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
									{nigerianStates.map((state, index) => (
										<SelectItem key={index} value={state}>
											{state}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Address <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your address"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								City <RequiredAsterisk />
							</FormLabel>
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
				<FormField
					control={form.control}
					name="termsAndCondition"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								I have read and agree to the{" "}
								<Link
									className="underline hover:text-primary"
									href="/terms-and-condition"
								>
									Terms and Conditions.
								</Link>
							</FormLabel>
						</FormItem>
					)}
				/>

				{/* <Button size={"lg"} type="submit">
					Submit
				</Button> */}
			</form>
		</Form>
	);
}
