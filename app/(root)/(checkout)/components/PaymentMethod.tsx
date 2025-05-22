"use client";
import { z } from "zod";
import { useState } from "react";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { paymentMethods } from "@/constants";
import { Button } from "@/components/ui/button";
import { PaymentFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InformationBox } from "@/app/(admin)/components/InformationBox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export const PaymentMethod = () => {
	const [success, setSuccess] = useState(false);
	const form = useForm<z.infer<typeof PaymentFormSchema>>({
		resolver: zodResolver(PaymentFormSchema),
	});

	async function onSubmit(data: z.infer<typeof PaymentFormSchema>) {
		try {
			const details = {
				paymentMethod: data.paymentMethod,
			};

			localStorage.setItem("paymentMethod", JSON.stringify(details));

			setSuccess(true);

			toast({
				title: "Success!",
			});
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:border dark:bg-black dark:text-white w-full">
			<h2 className="text-xl md:text-2xl uppercase font-semibold mb-4">
				Payment Method
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="paymentMethod"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										{paymentMethods.map(
											({ label, value }, index) => (
												<FormItem
													key={index}
													className="flex items-center space-x-3 space-y-0 rounded-md border p-4"
												>
													<FormControl>
														<RadioGroupItem
															value={value}
														/>
													</FormControl>
													<FormLabel className="font-medium">
														{label}
													</FormLabel>
												</FormItem>
											)
										)}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{success ? (
						<InformationBox
							icon={Check}
							variant="success"
							title="Payment method saved"
						/>
					) : (
						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							size="lg"
							className=""
						>
							{form.formState.isSubmitting ? "Saving..." : "Save"}
						</Button>
					)}
				</form>
			</Form>
		</div>
	);
};
