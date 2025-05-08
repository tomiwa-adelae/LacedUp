// // // import React, { useState, useEffect, KeyboardEvent } from "react";
// // // import { X, Plus, Tag as TagIcon } from "lucide-react";
// // // import { useForm } from "react-hook-form";

// // // // Import shadcn components
// // // import { Input } from "@/components/ui/input";
// // // import {
// // // 	Form,
// // // 	FormControl,
// // // 	FormDescription,
// // // 	FormField,
// // // 	FormItem,
// // // 	FormLabel,
// // // } from "@/components/ui/form";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // // 	Card,
// // // 	CardContent,
// // // 	CardDescription,
// // // 	CardFooter,
// // // 	CardHeader,
// // // 	CardTitle,
// // // } from "@/components/ui/card";
// // // import {
// // // 	Command,
// // // 	CommandEmpty,
// // // 	CommandGroup,
// // // 	CommandInput,
// // // 	CommandItem,
// // // 	CommandList,
// // // } from "@/components/ui/command";
// // // import {
// // // 	Popover,
// // // 	PopoverContent,
// // // 	PopoverTrigger,
// // // } from "@/components/ui/popover";

// // // // Define types
// // // interface TagManagementProps {
// // // 	initialTags?: string[];
// // // 	onTagsChange?: (tags: string[]) => void;
// // // 	suggestedTags?: string[];
// // // }

// // // // Form schema using plain validation instead of zod
// // // type FormValues = {
// // // 	tagInput: string;
// // // };

// // // export function TagsManagement({
// // // 	initialTags = [],
// // // 	onTagsChange,
// // // 	suggestedTags = [
// // // 		"Running",
// // // 		"Casual",
// // // 		"Formal",
// // // 		"Sports",
// // // 		"Kids",
// // // 		"Waterproof",
// // // 		"Leather",
// // // 		"Canvas",
// // // 		"Summer",
// // // 		"Winter",
// // // 		"Sale",
// // // 		"New Arrival",
// // // 		"Limited Edition",
// // // 		"Sustainable",
// // // 	],
// // // }: TagManagementProps) {
// // // 	// Use client-side only state with useEffect for initialization
// // // 	const [isClient, setIsClient] = useState(false);
// // // 	const [tags, setTags] = useState<string[]>([]);
// // // 	const [open, setOpen] = useState(false);
// // // 	const [inputValue, setInputValue] = useState("");
// // // 	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
// // // 		[]
// // // 	);

// // // 	// Initialize react-hook-form
// // // 	const form = useForm<FormValues>({
// // // 		defaultValues: {
// // // 			tagInput: "",
// // // 		},
// // // 	});

// // // 	// Client-side initialization to prevent hydration mismatch
// // // 	useEffect(() => {
// // // 		setIsClient(true);
// // // 		setTags(initialTags);
// // // 	}, [initialTags]);

// // // 	// Update filtered suggestions when input changes
// // // 	useEffect(() => {
// // // 		if (inputValue.trim()) {
// // // 			const filtered = suggestedTags
// // // 				.filter(
// // // 					(tag) =>
// // // 						tag.toLowerCase().includes(inputValue.toLowerCase()) &&
// // // 						!tags.includes(tag)
// // // 				)
// // // 				.slice(0, 5);
// // // 			setFilteredSuggestions(filtered);
// // // 		} else {
// // // 			setFilteredSuggestions([]);
// // // 		}
// // // 	}, [inputValue, tags, suggestedTags]);

// // // 	// Notify parent component when tags change
// // // 	useEffect(() => {
// // // 		if (isClient && onTagsChange) {
// // // 			onTagsChange(tags);
// // // 		}
// // // 	}, [tags, onTagsChange, isClient]);

// // // 	const addTag = (tag: string) => {
// // // 		const trimmedTag = tag.trim();
// // // 		if (trimmedTag && !tags.includes(trimmedTag)) {
// // // 			setTags([...tags, trimmedTag]);
// // // 			form.setValue("tagInput", "");
// // // 			setInputValue("");
// // // 		}
// // // 	};

// // // 	const removeTag = (tagToRemove: string) => {
// // // 		setTags(tags.filter((tag) => tag !== tagToRemove));
// // // 	};

// // // 	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
// // // 		const value = form.getValues().tagInput;

// // // 		if ((event.key === "Enter" || event.key === ",") && value.trim()) {
// // // 			event.preventDefault();
// // // 			const newTag = value.replace(",", "").trim();
// // // 			addTag(newTag);
// // // 		}
// // // 	};

// // // 	// If we're still on the server or haven't initialized client-side yet, render a simpler version
// // // 	if (!isClient) {
// // // 		return (
// // // 			<div>
// // // 				<FormLabel>Tags</FormLabel>
// // // 			</div>
// // // 		);
// // // 	}

// // // 	return (
// // // 		<div>
// // // 			<Form {...form}>
// // // 				<FormField
// // // 					control={form.control}
// // // 					name="tagInput"
// // // 					render={({ field }) => (
// // // 						<FormItem>
// // // 							<FormLabel>Tags</FormLabel>
// // // 							<FormControl>
// // // 								<div className="flex flex-col space-y-4">
// // // 									{/* Tags display */}
// // // 									<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 bg-white dark:bg-black">
// // // 										{tags.map((tag, index) => (
// // // 											<Badge
// // // 												key={index}
// // // 												variant="secondary"
// // // 												className="flex items-center gap-1 px-3 py-1.5"
// // // 											>
// // // 												<TagIcon className="w-3 h-3" />
// // // 												<span>{tag}</span>
// // // 												<Button
// // // 													type="button"
// // // 													variant="ghost"
// // // 													size="sm"
// // // 													className="h-4 w-4 p-0 hover:bg-transparent"
// // // 													onClick={() =>
// // // 														removeTag(tag)
// // // 													}
// // // 												>
// // // 													<X className="h-3 w-3" />
// // // 													<span className="sr-only">
// // // 														Remove {tag} tag
// // // 													</span>
// // // 												</Button>
// // // 											</Badge>
// // // 										))}

// // // 										<div className="relative flex-grow">
// // // 											<Input
// // // 												{...field}
// // // 												value={inputValue}
// // // 												placeholder={
// // // 													tags.length > 0
// // // 														? ""
// // // 														: "Type to add tags..."
// // // 												}
// // // 												className="border-none shadow-none focus-visible:ring-0 p-1"
// // // 												onChange={(e) => {
// // // 													field.onChange(e);
// // // 													setInputValue(
// // // 														e.target.value
// // // 													);
// // // 													setOpen(!!e.target.value);
// // // 												}}
// // // 												onKeyDown={handleKeyDown}
// // // 											/>

// // // 											{open &&
// // // 												filteredSuggestions.length >
// // // 													0 && (
// // // 													<div className="absolute z-10 w-full">
// // // 														<Command>
// // // 															<CommandList>
// // // 																<CommandGroup>
// // // 																	{filteredSuggestions.map(
// // // 																		(
// // // 																			suggestion,
// // // 																			index
// // // 																		) => (
// // // 																			<CommandItem
// // // 																				key={
// // // 																					index
// // // 																				}
// // // 																				onSelect={() => {
// // // 																					addTag(
// // // 																						suggestion
// // // 																					);
// // // 																					setOpen(
// // // 																						false
// // // 																					);
// // // 																				}}
// // // 																			>
// // // 																				{
// // // 																					suggestion
// // // 																				}
// // // 																			</CommandItem>
// // // 																		)
// // // 																	)}
// // // 																</CommandGroup>
// // // 																{filteredSuggestions.length ===
// // // 																	0 && (
// // // 																	<CommandEmpty>
// // // 																		No
// // // 																		matching
// // // 																		tags
// // // 																	</CommandEmpty>
// // // 																)}
// // // 															</CommandList>
// // // 														</Command>
// // // 													</div>
// // // 												)}
// // // 										</div>
// // // 									</div>
// // // 								</div>
// // // 							</FormControl>
// // // 						</FormItem>
// // // 					)}
// // // 				/>
// // // 			</Form>

// // // 			{/* Common tags section */}
// // // 			<div className="mt-6">
// // // 				<h3 className="text-sm font-medium mb-2">Common Tags</h3>
// // // 				<div className="flex flex-wrap gap-2">
// // // 					{suggestedTags
// // // 						.filter((tag) => !tags.includes(tag))
// // // 						.slice(0, 8)
// // // 						.map((tag, index) => (
// // // 							<Button
// // // 								key={index}
// // // 								type="button"
// // // 								variant="outline"
// // // 								size="sm"
// // // 								onClick={() => addTag(tag)}
// // // 								className="text-[9px] font-medium capitalize flex items-center gap-1 h-8"
// // // 							>
// // // 								<Plus className="w-3 h-3" />
// // // 								{tag}
// // // 							</Button>
// // // 						))}
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }

// // "use client";

// // import React, { useState, useEffect, KeyboardEvent } from "react";
// // import { X, Plus, Tag as TagIcon } from "lucide-react";
// // import { useForm } from "react-hook-form";

// // // Import shadcn components
// // import { Input } from "@/components/ui/input";
// // import {
// // 	Form,
// // 	FormControl,
// // 	FormField,
// // 	FormItem,
// // 	FormLabel,
// // } from "@/components/ui/form";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import {
// // 	Command,
// // 	CommandEmpty,
// // 	CommandGroup,
// // 	CommandItem,
// // 	CommandList,
// // } from "@/components/ui/command";

// // // Define types
// // interface TagManagementProps {
// // 	initialTags?: string[];
// // 	onTagsChange?: (tags: string[]) => void;
// // 	suggestedTags?: string[];
// // }

// // // Form schema using plain validation instead of zod
// // type FormValues = {
// // 	tagInput: string;
// // };

// // export default function TagsManagement({
// // 	initialTags = [],
// // 	onTagsChange,
// // 	suggestedTags = [
// // 		"Running",
// // 		"Casual",
// // 		"Formal",
// // 		"Sports",
// // 		"Kids",
// // 		"Waterproof",
// // 		"Leather",
// // 		"Canvas",
// // 		"Summer",
// // 		"Winter",
// // 		"Sale",
// // 		"New Arrival",
// // 		"Limited Edition",
// // 		"Sustainable",
// // 	],
// // }: TagManagementProps) {
// // 	// Use client-side only state with useEffect for initialization
// // 	const [mounted, setMounted] = useState(false);
// // 	const [tags, setTags] = useState<string[]>([]);
// // 	const [open, setOpen] = useState(false);
// // 	const [inputValue, setInputValue] = useState("");
// // 	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
// // 		[]
// // 	);

// // 	// Initialize react-hook-form
// // 	const form = useForm<FormValues>({
// // 		defaultValues: {
// // 			tagInput: "",
// // 		},
// // 	});

// // 	// Client-side initialization to prevent hydration mismatch
// // 	useEffect(() => {
// // 		setMounted(true);
// // 		setTags(initialTags);
// // 	}, [initialTags]);

// // 	// Update filtered suggestions when input changes
// // 	useEffect(() => {
// // 		if (inputValue.trim()) {
// // 			const filtered = suggestedTags
// // 				.filter(
// // 					(tag) =>
// // 						tag.toLowerCase().includes(inputValue.toLowerCase()) &&
// // 						!tags.includes(tag)
// // 				)
// // 				.slice(0, 5);
// // 			setFilteredSuggestions(filtered);
// // 		} else {
// // 			setFilteredSuggestions([]);
// // 		}
// // 	}, [inputValue, tags, suggestedTags]);

// // 	// Notify parent component when tags change
// // 	useEffect(() => {
// // 		if (mounted && onTagsChange) {
// // 			onTagsChange(tags);
// // 		}
// // 	}, [tags, onTagsChange, mounted]);

// // 	const addTag = (tag: string) => {
// // 		const trimmedTag = tag.trim();
// // 		if (trimmedTag && !tags.includes(trimmedTag)) {
// // 			setTags([...tags, trimmedTag]);
// // 			form.setValue("tagInput", "");
// // 			setInputValue("");
// // 		}

// // 		console.log(tags);
// // 	};

// // 	const removeTag = (tagToRemove: string) => {
// // 		setTags(tags.filter((tag) => tag !== tagToRemove));
// // 	};

// // 	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
// // 		const value = form.getValues().tagInput;

// // 		if ((event.key === "Enter" || event.key === ",") && value.trim()) {
// // 			event.preventDefault();
// // 			const newTag = value.replace(",", "").trim();
// // 			addTag(newTag);
// // 		}
// // 	};

// // 	// If we're still on the server or haven't initialized client-side yet, return null
// // 	if (!mounted) {
// // 		return null;
// // 	}

// // 	return (
// // 		<div>
// // 			<Form {...form}>
// // 				<FormField
// // 					control={form.control}
// // 					name="tagInput"
// // 					render={({ field }) => (
// // 						<FormItem>
// // 							<FormLabel>Tags</FormLabel>
// // 							<FormControl>
// // 								<div className="flex flex-col space-y-4">
// // 									{/* Tags display */}
// // 									<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 bg-white dark:bg-black">
// // 										{tags.map((tag, index) => (
// // 											<Badge
// // 												key={index}
// // 												variant="secondary"
// // 												className="flex items-center gap-1 px-3 py-1.5"
// // 											>
// // 												<TagIcon className="w-3 h-3" />
// // 												<span>{tag}</span>
// // 												<Button
// // 													type="button"
// // 													variant="ghost"
// // 													size="sm"
// // 													className="h-4 w-4 p-0 hover:bg-transparent"
// // 													onClick={() =>
// // 														removeTag(tag)
// // 													}
// // 												>
// // 													<X className="h-3 w-3" />
// // 													<span className="sr-only">
// // 														Remove {tag} tag
// // 													</span>
// // 												</Button>
// // 											</Badge>
// // 										))}

// // 										<div className="relative flex-grow">
// // 											<Input
// // 												{...field}
// // 												value={inputValue}
// // 												placeholder={
// // 													tags.length > 0
// // 														? ""
// // 														: "Type to add tags..."
// // 												}
// // 												className="border-none shadow-none focus-visible:ring-0 p-1"
// // 												onChange={(e) => {
// // 													field.onChange(e);
// // 													setInputValue(
// // 														e.target.value
// // 													);
// // 													setOpen(!!e.target.value);
// // 												}}
// // 												onKeyDown={handleKeyDown}
// // 											/>

// // 											{open &&
// // 												filteredSuggestions.length >
// // 													0 && (
// // 													<div className="absolute z-10 w-full">
// // 														<Command>
// // 															<CommandList>
// // 																<CommandGroup>
// // 																	{filteredSuggestions.map(
// // 																		(
// // 																			suggestion,
// // 																			index
// // 																		) => (
// // 																			<CommandItem
// // 																				key={
// // 																					index
// // 																				}
// // 																				onSelect={() => {
// // 																					addTag(
// // 																						suggestion
// // 																					);
// // 																					setOpen(
// // 																						false
// // 																					);
// // 																				}}
// // 																			>
// // 																				{
// // 																					suggestion
// // 																				}
// // 																			</CommandItem>
// // 																		)
// // 																	)}
// // 																</CommandGroup>
// // 																{filteredSuggestions.length ===
// // 																	0 && (
// // 																	<CommandEmpty>
// // 																		No
// // 																		matching
// // 																		tags
// // 																	</CommandEmpty>
// // 																)}
// // 															</CommandList>
// // 														</Command>
// // 													</div>
// // 												)}
// // 										</div>
// // 									</div>
// // 								</div>
// // 							</FormControl>
// // 						</FormItem>
// // 					)}
// // 				/>
// // 			</Form>

// // 			{/* Common tags section */}
// // 			<div className="mt-6">
// // 				<h3 className="text-sm font-medium mb-2">Common Tags</h3>
// // 				<div className="flex flex-wrap gap-2">
// // 					{suggestedTags
// // 						.filter((tag) => !tags.includes(tag))
// // 						.slice(0, 8)
// // 						.map((tag, index) => (
// // 							<Button
// // 								key={index}
// // 								type="button"
// // 								variant="outline"
// // 								size="sm"
// // 								onClick={() => addTag(tag)}
// // 								className="text-xs font-medium capitalize flex items-center gap-1 h-8"
// // 							>
// // 								<Plus className="w-3 h-3" />
// // 								{tag}
// // 							</Button>
// // 						))}
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }

// "use client";

// import React, { useState, useEffect, KeyboardEvent } from "react";
// import { X, Plus, Tag as TagIcon } from "lucide-react";
// import { useForm } from "react-hook-form";

// // Import shadcn components
// import { Input } from "@/components/ui/input";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// } from "@/components/ui/form";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandItem,
// 	CommandList,
// } from "@/components/ui/command";

// // Define types
// interface TagManagementProps {
// 	initialTags?: string[];
// 	onTagsChange?: (tags: string[]) => void;
// 	suggestedTags?: string[];
// }

// // Form schema using plain validation instead of zod
// type FormValues = {
// 	tagInput: string;
// };

// export default function TagsManagement({
// 	initialTags = [],
// 	onTagsChange,
// 	suggestedTags = [
// 		"Running",
// 		"Casual",
// 		"Formal",
// 		"Sports",
// 		"Kids",
// 		"Waterproof",
// 		"Leather",
// 		"Canvas",
// 		"Summer",
// 		"Winter",
// 		"Sale",
// 		"New Arrival",
// 		"Limited Edition",
// 		"Sustainable",
// 	],
// }: TagManagementProps) {
// 	// Use client-side only state with useEffect for initialization
// 	const [mounted, setMounted] = useState(false);
// 	const [tags, setTags] = useState<string[]>([]);
// 	const [open, setOpen] = useState(false);
// 	const [inputValue, setInputValue] = useState("");
// 	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
// 		[]
// 	);

// 	// Initialize react-hook-form
// 	const form = useForm<FormValues>({
// 		defaultValues: {
// 			tagInput: "",
// 		},
// 	});

// 	// Simplify the effect that notifies parent about tag changes
// 	useEffect(() => {
// 		// Only initialize tags when mounted to avoid hydration issues
// 		if (!mounted) {
// 			return;
// 		}

// 		// Initial setup of tags
// 		if (initialTags && initialTags.length > 0) {
// 			setTags(initialTags);
// 		}
// 	}, [mounted, initialTags]); // Remove tags from dependencies to avoid loops

// 	// Update filtered suggestions when input changes
// 	useEffect(() => {
// 		if (inputValue.trim()) {
// 			const filtered = suggestedTags
// 				.filter(
// 					(tag) =>
// 						tag.toLowerCase().includes(inputValue.toLowerCase()) &&
// 						!tags.includes(tag)
// 				)
// 				.slice(0, 5);
// 			setFilteredSuggestions(filtered);
// 		} else {
// 			setFilteredSuggestions([]);
// 		}
// 	}, [inputValue, tags, suggestedTags]);

// 	// Add mounting effect separately
// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);

// 	const addTag = (tag: string) => {
// 		const trimmedTag = tag.trim();
// 		if (trimmedTag && !tags.includes(trimmedTag)) {
// 			// Create a new array reference to ensure React detects the change
// 			const newTags = [...tags, trimmedTag];
// 			setTags(newTags);
// 			form.setValue("tagInput", "");
// 			setInputValue("");

// 			console.log(newTags);

// 			// Directly notify parent to ensure update happens
// 			if (onTagsChange) {
// 				onTagsChange(newTags);
// 				console.log(newTags);
// 			}
// 		}
// 	};

// 	const removeTag = (tagToRemove: string) => {
// 		const newTags = tags.filter((tag) => tag !== tagToRemove);
// 		setTags(newTags);

// 		// Directly notify parent to ensure update happens
// 		if (onTagsChange) {
// 			onTagsChange(newTags);
// 		}
// 	};

// 	// Modify the event handler to ensure it's properly adding tags
// 	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
// 		const value = inputValue.trim(); // Use inputValue directly for more reliability

// 		if ((event.key === "Enter" || event.key === ",") && value) {
// 			event.preventDefault();
// 			const newTag = value.replace(",", "").trim();
// 			addTag(newTag);
// 		}
// 	};

// 	// If we're still on the server or haven't initialized client-side yet, return null
// 	if (!mounted) {
// 		return null;
// 	}

// 	return (
// 		<div>
// 			<Form {...form}>
// 				<FormField
// 					control={form.control}
// 					name="tagInput"
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Tags</FormLabel>
// 							<FormControl>
// 								<div className="flex flex-col space-y-4">
// 									{/* Tags display */}
// 									<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 bg-white dark:bg-black">
// 										{tags.map((tag, index) => (
// 											<Badge
// 												key={index}
// 												variant="secondary"
// 												className="flex items-center gap-1 px-3 py-1.5"
// 											>
// 												<TagIcon className="w-3 h-3" />
// 												<span>{tag}</span>
// 												<Button
// 													type="button"
// 													variant="ghost"
// 													size="sm"
// 													className="h-4 w-4 p-0 hover:bg-transparent"
// 													onClick={() =>
// 														removeTag(tag)
// 													}
// 												>
// 													<X className="h-3 w-3" />
// 													<span className="sr-only">
// 														Remove {tag} tag
// 													</span>
// 												</Button>
// 											</Badge>
// 										))}

// 										<div className="relative flex-grow">
// 											<Input
// 												{...field}
// 												value={inputValue}
// 												placeholder={
// 													tags.length > 0
// 														? ""
// 														: "Type to add tags..."
// 												}
// 												className="border-none shadow-none focus-visible:ring-0 p-1"
// 												onChange={(e) => {
// 													field.onChange(e);
// 													setInputValue(
// 														e.target.value
// 													);
// 													setOpen(!!e.target.value);
// 												}}
// 												onKeyDown={handleKeyDown}
// 											/>

// 											{open &&
// 												filteredSuggestions.length >
// 													0 && (
// 													<div className="absolute z-10 w-full">
// 														<Command>
// 															<CommandList>
// 																<CommandGroup>
// 																	{filteredSuggestions.map(
// 																		(
// 																			suggestion,
// 																			index
// 																		) => (
// 																			<CommandItem
// 																				key={
// 																					index
// 																				}
// 																				onSelect={() => {
// 																					addTag(
// 																						suggestion
// 																					);
// 																					setOpen(
// 																						false
// 																					);
// 																				}}
// 																			>
// 																				{
// 																					suggestion
// 																				}
// 																			</CommandItem>
// 																		)
// 																	)}
// 																</CommandGroup>
// 																{filteredSuggestions.length ===
// 																	0 && (
// 																	<CommandEmpty>
// 																		No
// 																		matching
// 																		tags
// 																	</CommandEmpty>
// 																)}
// 															</CommandList>
// 														</Command>
// 													</div>
// 												)}
// 										</div>
// 									</div>
// 								</div>
// 							</FormControl>
// 						</FormItem>
// 					)}
// 				/>
// 			</Form>

// 			{/* Common tags section */}
// 			<div className="mt-6">
// 				<h3 className="text-sm font-medium mb-2">Common Tags</h3>
// 				<div className="flex flex-wrap gap-2">
// 					{suggestedTags
// 						.filter((tag) => !tags.includes(tag))
// 						.slice(0, 8)
// 						.map((tag, index) => (
// 							<Button
// 								key={index}
// 								type="button"
// 								variant="outline"
// 								size="sm"
// 								onClick={() => addTag(tag)}
// 								className="text-xs font-medium capitalize flex items-center gap-1 h-8"
// 							>
// 								<Plus className="w-3 h-3" />
// 								{tag}
// 							</Button>
// 						))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { X, Plus, TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormLabel } from "@/components/ui/form";

interface Tag {
	name: string;
}

interface TagsManagementProps {
	initialTags?: Tag[];
	onChange?: (tags: Tag[]) => void;
}

export default function TagsManagement({
	initialTags = [],
	onChange = () => {},
}: TagsManagementProps) {
	const [tags, setTags] = useState<Tag[]>(initialTags);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef(null);

	const handleAddTag = () => {
		const trimmedValue = inputValue.trim();

		if (!trimmedValue) {
			return;
		}

		if (tags.some((tag) => tag.name === trimmedValue)) {
			setError("This tag already exists");
			return;
		}
		// Add new tag object with name property
		const newTag: Tag = { name: trimmedValue };
		const newTags = [...tags, newTag];
		setTags(newTags);
		onChange(newTags);
		setInputValue("");
		setError("");
	};

	console.log(tags);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		} else if (e.key === "," || e.key === ";") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const removeTag = (tagToRemove: Tag) => {
		const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);
		setTags(newTags);
		onChange(newTags);
	};

	const focusInput = () => {
		// @ts-ignore
		inputRef.current?.focus();
	};

	return (
		<div>
			<FormLabel className="mb-4 block">Tags</FormLabel>
			<div className="flex flex-col space-y-4">
				<div className="flex">
					<div className="flex-1">
						<Input
							ref={inputRef}
							placeholder="Add a tag..."
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
								if (error) setError("");
							}}
							onKeyDown={handleKeyDown}
							className={error ? "border-red-500" : ""}
						/>
						{error && (
							<p className="text-red-500 text-sm mt-1">{error}</p>
						)}
					</div>
					<Button
						onClick={handleAddTag}
						type="button"
						variant={"outline"}
						size={"sm"}
						className="rounded-md h-12"
					>
						Add
					</Button>
				</div>

				<div
					className="flex flex-wrap gap-2 min-h-10"
					onClick={focusInput}
				>
					{tags.length === 0 ? (
						<p className="text-gray-400 text-sm">
							No tags added yet. Click to add tags.
						</p>
					) : (
						tags.map((tag, index) => (
							<Badge
								key={index}
								variant="secondary"
								className="text-sm py-1 px-3"
							>
								{tag.name}
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 hover:bg-transparent"
									onClick={(e) => {
										e.stopPropagation();
										removeTag(tag);
									}}
								>
									<X className="h-3 w-3" />
									<span className="sr-only">
										Remove {tag.name} tag
									</span>
								</Button>
							</Badge>
						))
					)}
				</div>
				{/* <div
					className="flex flex-wrap gap-2 min-h-10"
					onClick={focusInput}
				>
					{tags.length === 0 ? (
						<p className="text-gray-400 text-sm">
							No tags added yet. Click to add tags.
						</p>
					) : (
						tags.map((tag: any, index: string) => (
							<Badge
								key={index}
								variant="secondary"
								className="text-sm py-1 px-3"
							>
								<TagIcon className="w-3 h-3" />
								{tag.name}
									<X className="h-3 w-3" />
								</button> */}

				{/* <Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 hover:bg-transparent"
									onClick={(e) => {
										e.stopPropagation();
										removeTag(tag);
									}}
								>
									<X className="h-3 w-3" />
									<span className="sr-only">
										Remove {tag} tag
									</span>
								</Button>
							</Badge> */}
				{/* ))
					)} */}
				{/* </div>  */}
			</div>
		</div>
	);
}
