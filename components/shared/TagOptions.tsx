"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
	tags: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

export function TagOptions({ tags }: { tags: any }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get tags from URL if available
	const selectedTags = searchParams.get("tags")?.split(",") || [];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			tags: selectedTags,
		},
	});

	// Update URL when tags change
	function updateUrlWithTags(updatedTags: string[]) {
		const params = new URLSearchParams(window.location.search);
		if (updatedTags.length > 0) {
			params.set("tags", updatedTags.join(","));
		} else {
			params.delete("tags");
		}
		router.push(`?${params.toString()}`, { scroll: false });
	}

	function onSubmit(data: z.infer<typeof FormSchema>) {
		updateUrlWithTags(data.tags);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
				<FormField
					control={form.control}
					name="tags"
					render={() => (
						<FormItem>
							{tags.map((item: any) => (
								<FormField
									key={item}
									control={form.control}
									name="tags"
									render={({ field }) => {
										const isChecked =
											field.value?.includes(item);
										return (
											<FormItem
												key={item}
												className="flex flex-row items-start space-x-1 space-y-2"
											>
												<FormControl>
													<Checkbox
														checked={isChecked}
														onCheckedChange={(
															checked
														) => {
															let updated: string[];
															if (checked) {
																updated = [
																	...field.value,
																	item,
																];
															} else {
																updated =
																	field.value.filter(
																		(
																			value
																		) =>
																			value !==
																			item
																	);
															}
															field.onChange(
																updated
															);
															updateUrlWithTags(
																updated
															);
														}}
													/>
												</FormControl>
												<FormLabel className="font-medium">
													{item}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							{tags.length === 0 && (
								<p className="italic text-sm text-center py-8">
									No tags available
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
