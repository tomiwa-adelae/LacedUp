"use client";
import { z } from "zod";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitlistFormSchema } from "@/lib/validations";
import { addNewsLetter } from "@/lib/actions/newsletter.actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

const WaitlistForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof WaitlistFormSchema>>({
		resolver: zodResolver(WaitlistFormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof WaitlistFormSchema>) {
		try {
			const res = await addNewsLetter(data.email);

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

			router.push("/success-newsletter");
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="mt-8 relative flex flex-col sm:flex-row max-w-4xl gap-8">
									<div className="flex-1">
										<Input
											placeholder="john@gmail.com"
											className="h-14"
											{...field}
										/>
									</div>
									<Button
										size="md"
										variant={"secondary"}
										className="sm:absolute top-[50%] right-[2px] translate-x-[-2px] translate-y-[-50%] w-full sm:w-auto rounded-md"
										type="submit"
										disabled={form.formState.isSubmitting}
									>
										{form.formState.isSubmitting
											? "Joining..."
											: "Join the party"}
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default WaitlistForm;
