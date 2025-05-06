import React, { useState, useEffect, KeyboardEvent } from "react";
import { X, Plus, Tag as TagIcon } from "lucide-react";
import { useForm } from "react-hook-form";

// Import shadcn components
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Define types
interface TagManagementProps {
	initialTags?: string[];
	onTagsChange?: (tags: string[]) => void;
	suggestedTags?: string[];
}

// Form schema using plain validation instead of zod
type FormValues = {
	tagInput: string;
};

export function TagsManagement({
	initialTags = [],
	onTagsChange,
	suggestedTags = [
		"Running",
		"Casual",
		"Formal",
		"Sports",
		"Kids",
		"Waterproof",
		"Leather",
		"Canvas",
		"Summer",
		"Winter",
		"Sale",
		"New Arrival",
		"Limited Edition",
		"Sustainable",
	],
}: TagManagementProps) {
	// Use client-side only state with useEffect for initialization
	const [isClient, setIsClient] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
		[]
	);

	// Initialize react-hook-form
	const form = useForm<FormValues>({
		defaultValues: {
			tagInput: "",
		},
	});

	// Client-side initialization to prevent hydration mismatch
	useEffect(() => {
		setIsClient(true);
		setTags(initialTags);
	}, [initialTags]);

	// Update filtered suggestions when input changes
	useEffect(() => {
		if (inputValue.trim()) {
			const filtered = suggestedTags
				.filter(
					(tag) =>
						tag.toLowerCase().includes(inputValue.toLowerCase()) &&
						!tags.includes(tag)
				)
				.slice(0, 5);
			setFilteredSuggestions(filtered);
		} else {
			setFilteredSuggestions([]);
		}
	}, [inputValue, tags, suggestedTags]);

	// Notify parent component when tags change
	useEffect(() => {
		if (isClient && onTagsChange) {
			onTagsChange(tags);
		}
	}, [tags, onTagsChange, isClient]);

	const addTag = (tag: string) => {
		const trimmedTag = tag.trim();
		if (trimmedTag && !tags.includes(trimmedTag)) {
			setTags([...tags, trimmedTag]);
			form.setValue("tagInput", "");
			setInputValue("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const value = form.getValues().tagInput;

		if ((event.key === "Enter" || event.key === ",") && value.trim()) {
			event.preventDefault();
			const newTag = value.replace(",", "").trim();
			addTag(newTag);
		}
	};

	// If we're still on the server or haven't initialized client-side yet, render a simpler version
	if (!isClient) {
		return (
			<div>
				<FormLabel>Tags</FormLabel>
			</div>
		);
	}

	return (
		<div>
			<Form {...form}>
				<FormField
					control={form.control}
					name="tagInput"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<div className="flex flex-col space-y-4">
									{/* Tags display */}
									<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 bg-white dark:bg-black">
										{tags.map((tag, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="flex items-center gap-1 px-3 py-1.5"
											>
												<TagIcon className="w-3 h-3" />
												<span>{tag}</span>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="h-4 w-4 p-0 hover:bg-transparent"
													onClick={() =>
														removeTag(tag)
													}
												>
													<X className="h-3 w-3" />
													<span className="sr-only">
														Remove {tag} tag
													</span>
												</Button>
											</Badge>
										))}

										<div className="relative flex-grow">
											<Input
												{...field}
												value={inputValue}
												placeholder={
													tags.length > 0
														? ""
														: "Type to add tags..."
												}
												className="border-none shadow-none focus-visible:ring-0 p-1"
												onChange={(e) => {
													field.onChange(e);
													setInputValue(
														e.target.value
													);
													setOpen(!!e.target.value);
												}}
												onKeyDown={handleKeyDown}
											/>

											{open &&
												filteredSuggestions.length >
													0 && (
													<div className="absolute z-10 w-full">
														<Command>
															<CommandList>
																<CommandGroup>
																	{filteredSuggestions.map(
																		(
																			suggestion,
																			index
																		) => (
																			<CommandItem
																				key={
																					index
																				}
																				onSelect={() => {
																					addTag(
																						suggestion
																					);
																					setOpen(
																						false
																					);
																				}}
																			>
																				{
																					suggestion
																				}
																			</CommandItem>
																		)
																	)}
																</CommandGroup>
																{filteredSuggestions.length ===
																	0 && (
																	<CommandEmpty>
																		No
																		matching
																		tags
																	</CommandEmpty>
																)}
															</CommandList>
														</Command>
													</div>
												)}
										</div>
									</div>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
			</Form>

			{/* Common tags section */}
			<div className="mt-6">
				<h3 className="text-sm font-medium mb-2">Common Tags</h3>
				<div className="flex flex-wrap gap-2">
					{suggestedTags
						.filter((tag) => !tags.includes(tag))
						.slice(0, 8)
						.map((tag, index) => (
							<Button
								key={index}
								type="button"
								variant="outline"
								size="sm"
								onClick={() => addTag(tag)}
								className="text-xs flex items-center gap-1 h-8"
							>
								<Plus className="w-3 h-3" />
								{tag}
							</Button>
						))}
				</div>
			</div>
		</div>
	);
}
