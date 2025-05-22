"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { TagsFormSchema } from "@/lib/validations";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export function TagOptions({ tags }: { tags: any }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get tags from URL if available
	const selectedTags = searchParams.get("tags")?.split(",") || [];

	const form = useForm<z.infer<typeof TagsFormSchema>>({
		resolver: zodResolver(TagsFormSchema),
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

	function onSubmit(data: z.infer<typeof TagsFormSchema>) {
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
												<FormLabel className="font-medium uppercase">
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
