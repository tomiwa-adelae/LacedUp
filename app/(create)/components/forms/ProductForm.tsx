// // "use client";

// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";
// // import { z } from "zod";

// // import { Button } from "@/components/ui/button";
// // import {
// // 	Form,
// // 	FormControl,
// // 	FormField,
// // 	FormItem,
// // 	FormLabel,
// // 	FormMessage,
// // } from "@/components/ui/form";
// // import {
// // 	Select,
// // 	SelectContent,
// // 	SelectItem,
// // 	SelectTrigger,
// // 	SelectValue,
// // } from "@/components/ui/select";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { FileUpload } from "@/components/ui/file-upload";
// // import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
// // // import { TagsManagement } from "../TagsManagement";
// // import dynamic from "next/dynamic";

// // const TagsManagement = dynamic(() => import("../TagsManagement"), {
// // 	ssr: false, // This completely skips SSR for this component
// // });
// // import { ColorsOption, ColorsSelector } from "../ColorsManagement";
// // import { toast } from "@/hooks/use-toast";
// // import { createNewProduct } from "@/lib/actions/product.actions";
// // import { formatMoneyInput, handleKeyDown } from "@/lib/utils";
// // import { useState } from "react";
// // import { CategorySelector } from "@/app/(admin)/components/CategorySelector";
// // import { uploadImages } from "@/lib/actions/upload.actions";
// // import Image from "next/image";

// // const FormSchema = z.object({
// // 	name: z.string().min(2),
// // 	description: z.string().min(10),
// // 	category: z.string().min(2),
// // });

// // interface Props {
// // 	userId: string;
// // }

// // export function ProductForm({ userId }: Props) {
// // 	const [price, setPrice] = useState("");
// // 	const [selectedTags, setSelectedTags] = useState<any>();
// // 	const [availableColors, setAvailableColors] = useState();
// // 	const [selectedCategoryId, setSelectedCategoryId] = useState("");
// // 	const [imageLoading, setImageLoading] = useState<boolean>(false);
// // 	const [images, setImages] = useState<string[]>([]);
// // 	const [error, setError] = useState<boolean | string>(false);
// // 	const [imageError, setImageError] = useState<boolean | string>(false);

// // 	const form = useForm<z.infer<typeof FormSchema>>({
// // 		resolver: zodResolver(FormSchema),
// // 		defaultValues: { name: "", description: "", category: "" },
// // 	});

// // 	const handleTagsChange = (tags: string[]) => {
// // 		setSelectedTags(tags);
// // 		// Update your form state
// // 	};

// // 	const handleColorsChange = (colors: ColorsOption[]) => {
// // 		console.log("Colors updated:", colors);
// // 		// Update your form state
// // 	};

// // 	const handleChange = (e: any) => {
// // 		let inputValue = e.target.value;

// // 		// If the input starts with a "0" and is followed by another number, remove the "0"
// // 		if (
// // 			inputValue.startsWith("0") &&
// // 			inputValue.length > 1 &&
// // 			inputValue[1] !== "."
// // 		) {
// // 			inputValue = inputValue.slice(1);
// // 		}

// // 		// Prevent the input from starting with a period
// // 		if (inputValue.startsWith(".")) {
// // 			return;
// // 		}

// // 		inputValue = inputValue.replace(/[^0-9.]/g, "");
// // 		const parts = inputValue.split(".");
// // 		if (parts.length > 2) {
// // 			inputValue = parts.shift() + "." + parts.join("");
// // 		}
// // 		if (parts[1]) {
// // 			parts[1] = parts[1].substring(0, 2);
// // 			inputValue = parts.join(".");
// // 		}

// // 		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
// // 			const formattedValue = formatMoneyInput(inputValue);
// // 			setPrice(formattedValue);
// // 		} else {
// // 			setError("Please enter an amount");
// // 		}
// // 		if (!inputValue) {
// // 			setError("Please enter an amount");
// // 		}
// // 	};

// // 	async function onSubmit(data: z.infer<typeof FormSchema>) {
// // 		try {
// // 			if (images.length === 0) return;
// // 			setImageError("Please upload at least one picture for the shoe");

// // 			const details = {
// // 				name: data.name,
// // 				description: data.description,
// // 				price,
// // 				category: selectedCategoryId,
// // 				tags: selectedTags,
// // 				userId,
// // 				availableColors,
// // 				media: images,
// // 			};

// // 			console.log(details);

// // 			// const res = await createNewProduct(details);
// // 		} catch (error) {
// // 			toast({
// // 				title: "Error!",
// // 				description: "An error occurred!",
// // 				variant: "destructive",
// // 			});
// // 		}
// // 	}

// // 	return (
// // 		<Form {...form}>
// // 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// // 				<div className="grid-cols-1 grid gap-4 lg:grid-cols-3">
// // 					<div className="col-span-2 grid gap-4">
// // 						<div>
// // 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// // 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// // 									Product
// // 								</h4>
// // 								<FormField
// // 									control={form.control}
// // 									name="name"
// // 									render={({ field }) => (
// // 										<FormItem>
// // 											<FormLabel>
// // 												Name <RequiredAsterisk />
// // 											</FormLabel>
// // 											<FormControl>
// // 												<Input
// // 													placeholder="Enter shoe name"
// // 													{...field}
// // 												/>
// // 											</FormControl>
// // 											<FormMessage />
// // 										</FormItem>
// // 									)}
// // 								/>
// // 								<FormField
// // 									control={form.control}
// // 									name="description"
// // 									render={({ field }) => (
// // 										<FormItem>
// // 											<FormLabel>
// // 												Description <RequiredAsterisk />
// // 											</FormLabel>
// // 											<FormControl>
// // 												<Textarea
// // 													placeholder="Tell us a little bit about the shoe"
// // 													className="resize-none"
// // 													{...field}
// // 												/>
// // 											</FormControl>
// // 											<FormMessage />
// // 										</FormItem>
// // 									)}
// // 								/>
// // 							</div>
// // 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
// // 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// // 									Media <RequiredAsterisk />
// // 								</h4>
// // 								<FileUpload
// // 									showTitle={false}
// // 									loading={imageLoading}
// // 									onChange={(files) => {
// // 										const reader = new FileReader();
// // 										reader.readAsDataURL(files[0]);
// // 										reader.onload = async () => {
// // 											try {
// // 												setImageLoading(true);
// // 												const base64Image =
// // 													reader.result as string;

// // 												setImages((prev: any) => [
// // 													...prev,
// // 													base64Image,
// // 												]);

// // 												setImageLoading(false);
// // 											} catch (error) {
// // 												setImageLoading(false);
// // 											} finally {
// // 												setImageLoading(false);
// // 											}
// // 										};
// // 									}}
// // 								/>
// // 								<div className="flex flex-wrap gap-4">
// // 									{images.map((img, idx) => (
// // 										<Image
// // 											key={idx}
// // 											src={img}
// // 											alt={img}
// // 											width={1000}
// // 											height={1000}
// // 											className={
// // 												"size-20 rounded-md object-cover"
// // 											}
// // 										/>
// // 									))}
// // 								</div>
// // 								{imageError && (
// // 									<FormMessage>{imageError}</FormMessage>
// // 								)}
// // 								{/* <FileUpload
// // 									showTitle={false}
// // 									loading={imageLoading}
// // 									onChange={async (selectedFiles) => {
// // 										try {
// // 											setImageLoading(true); // You'll need a state for this

// // 											const uploadedResults =
// // 												await Promise.all(
// // 													selectedFiles.map(
// // 														(file) => {
// // 															return new Promise(
// // 																(
// // 																	resolve,
// // 																	reject
// // 																) => {
// // 																	const reader =
// // 																		new FileReader();
// // 																	reader.readAsDataURL(
// // 																		file
// // 																	);
// // 																	reader.onload =
// // 																		async () => {
// // 																			try {
// // 																				const res =
// // 																					await fetch(
// // 																						"/api/upload",
// // 																						{
// // 																							method: "POST",
// // 																							headers:
// // 																								{
// // 																									"Content-Type":
// // 																										"application/json",
// // 																								},
// // 																							body: JSON.stringify(
// // 																								{
// // 																									file: reader.result,
// // 																								}
// // 																							),
// // 																						}
// // 																					);

// // 																				const data =
// // 																					await res.json();
// // 																				resolve(
// // 																					data
// // 																				);
// // 																			} catch (err) {
// // 																				reject(
// // 																					err
// // 																				);
// // 																			}
// // 																		};
// // 																	reader.onerror =
// // 																		(err) =>
// // 																			reject(
// // 																				err
// // 																			);
// // 																}
// // 															);
// // 														}
// // 													)
// // 												);

// // 											console.log(
// // 												"Uploaded files:",
// // 												uploadedResults
// // 											);
// // 										} catch (error) {
// // 											console.error(
// // 												"Upload error:",
// // 												error
// // 											);
// // 										} finally {
// // 											setImageLoading(false);
// // 										}
// // 									}}
// // 								/> */}
// // 							</div>
// // 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
// // 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// // 									Pricing <RequiredAsterisk />
// // 								</h4>
// // 								<Input
// // 									// type="number"
// // 									onKeyDown={handleKeyDown}
// // 									id="decimalInput"
// // 									inputMode="decimal"
// // 									value={price}
// // 									onChange={handleChange}
// // 									placeholder="0.00"
// // 									className="number-input"
// // 								/>
// // 							</div>
// // 						</div>
// // 					</div>
// // 					<div className="col-span-2 lg:col-span-1 grid gap-4">
// // 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// // 							<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// // 								Organization
// // 							</h4>
// // 							<CategorySelector
// // 								onCategorySelect={(categoryId) => {
// // 									setSelectedCategoryId(categoryId); // or whatever you want to do
// // 								}}
// // 								form={form}
// // 							/>
// // 						</div>
// // 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// // 							<TagsManagement
// // 								onTagsChange={handleTagsChange}
// // 								initialTags={["Casual", "Summer"]}
// // 							/>
// // 						</div>
// // 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// // 							<ColorsSelector
// // 								onColorsChange={(color: any) =>
// // 									setAvailableColors(color)
// // 								}
// // 							/>
// // 						</div>
// // 						<Button
// // 							onClick={() => {
// // 								if (images.length === 0)
// // 									return setImageError(
// // 										"Please upload at least one picture for the shoe"
// // 									);
// // 							}}
// // 							type="submit"
// // 							size="lg"
// // 							className="lg:hidden"
// // 						>
// // 							Create product
// // 						</Button>
// // 					</div>
// // 				</div>
// // 			</form>
// // 		</Form>
// // 	);
// // }

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { FileUpload } from "@/components/ui/file-upload";
// import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
// import dynamic from "next/dynamic";
// import { ColorsSelector } from "../ColorsManagement";
// import { toast } from "@/hooks/use-toast";
// import { formatMoneyInput, handleKeyDown } from "@/lib/utils";
// import React, { useState, useEffect, useCallback } from "react";
// import { CategorySelector } from "@/app/(admin)/components/CategorySelector";
// import Image from "next/image";

// // Import the component with no SSR
// const TagsManagement = dynamic(() => import("../TagsManagement"), {
// 	ssr: false,
// 	loading: () => <div className="h-[150px]">Loading tags...</div>,
// });

// const FormSchema = z.object({
// 	name: z.string().min(2),
// 	description: z.string().min(10),
// 	category: z.string().min(2),
// });

// interface Props {
// 	userId: string;
// }

// export function ProductForm({ userId }: Props) {
// 	const [price, setPrice] = useState("");
// 	const [selectedTags, setSelectedTags] = useState<string[]>([]);
// 	const [availableColors, setAvailableColors] = useState();
// 	const [selectedCategoryId, setSelectedCategoryId] = useState("");
// 	const [imageLoading, setImageLoading] = useState<boolean>(false);
// 	const [images, setImages] = useState<string[]>([]);
// 	const [error, setError] = useState<boolean | string>(false);
// 	const [imageError, setImageError] = useState<boolean | string>(false);
// 	const [mounted, setMounted] = useState(false);

// 	// Use effect to handle client-side only state
// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);

// 	const form = useForm<z.infer<typeof FormSchema>>({
// 		resolver: zodResolver(FormSchema),
// 		defaultValues: { name: "", description: "", category: "" },
// 	});

// 	// Simplified handler that just sets the state
// 	const handleTagsChange = (tags: string[]) => {
// 		setSelectedTags(tags);
// 	};

// 	const handleColorsChange = (colors: any[]) => {
// 		setAvailableColors(colors);
// 	};

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		let inputValue = e.target.value;

// 		// If the input starts with a "0" and is followed by another number, remove the "0"
// 		if (
// 			inputValue.startsWith("0") &&
// 			inputValue.length > 1 &&
// 			inputValue[1] !== "."
// 		) {
// 			inputValue = inputValue.slice(1);
// 		}

// 		// Prevent the input from starting with a period
// 		if (inputValue.startsWith(".")) {
// 			return;
// 		}

// 		inputValue = inputValue.replace(/[^0-9.]/g, "");
// 		const parts = inputValue.split(".");
// 		if (parts.length > 2) {
// 			inputValue = parts.shift() + "." + parts.join("");
// 		}
// 		if (parts[1]) {
// 			parts[1] = parts[1].substring(0, 2);
// 			inputValue = parts.join(".");
// 		}

// 		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
// 			const formattedValue = formatMoneyInput(inputValue);
// 			setPrice(formattedValue);
// 			setError(false);
// 		} else {
// 			setError("Please enter an amount");
// 		}
// 		if (!inputValue) {
// 			setError("Please enter an amount");
// 		}
// 	};

// 	async function onSubmit(data: z.infer<typeof FormSchema>) {
// 		try {
// 			if (images.length === 0) {
// 				setImageError(
// 					"Please upload at least one picture for the shoe"
// 				);
// 				return;
// 			}

// 			const details = {
// 				name: data.name,
// 				description: data.description,
// 				price,
// 				category: selectedCategoryId,
// 				tags: selectedTags,
// 				userId,
// 				availableColors,
// 				media: images,
// 			};

// 			console.log(details);
// 			// Uncomment the following line when ready to submit
// 			// const res = await createNewProduct(details);

// 			toast({
// 				title: "Success!",
// 				description: "Product created successfully!",
// 			});
// 		} catch (error) {
// 			toast({
// 				title: "Error!",
// 				description: "An error occurred!",
// 				variant: "destructive",
// 			});
// 		}
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 				<div className="grid-cols-1 grid gap-4 lg:grid-cols-3">
// 					<div className="col-span-2 grid gap-4">
// 						<div>
// 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// 									Product
// 								</h4>
// 								<FormField
// 									control={form.control}
// 									name="name"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>
// 												Name <RequiredAsterisk />
// 											</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="Enter shoe name"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 								<FormField
// 									control={form.control}
// 									name="description"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>
// 												Description <RequiredAsterisk />
// 											</FormLabel>
// 											<FormControl>
// 												<Textarea
// 													placeholder="Tell us a little bit about the shoe"
// 													className="resize-none"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>
// 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
// 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// 									Media <RequiredAsterisk />
// 								</h4>
// 								<FileUpload
// 									showTitle={false}
// 									loading={imageLoading}
// 									onChange={(files) => {
// 										const reader = new FileReader();
// 										reader.readAsDataURL(files[0]);
// 										reader.onload = async () => {
// 											try {
// 												setImageLoading(true);
// 												const base64Image =
// 													reader.result as string;
// 												setImages((prev) => [
// 													...prev,
// 													base64Image,
// 												]);
// 												setImageError(false);
// 											} catch (error) {
// 												console.error(
// 													"Error uploading image:",
// 													error
// 												);
// 											} finally {
// 												setImageLoading(false);
// 											}
// 										};
// 									}}
// 								/>
// 								<div className="flex flex-wrap gap-4">
// 									{images.map((img, idx) => (
// 										<Image
// 											key={idx}
// 											src={img}
// 											alt={`Product image ${idx + 1}`}
// 											width={1000}
// 											height={1000}
// 											className="size-20 rounded-md object-cover"
// 										/>
// 									))}
// 								</div>
// 								{imageError && (
// 									<FormMessage>{imageError}</FormMessage>
// 								)}
// 							</div>
// 							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
// 								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// 									Pricing <RequiredAsterisk />
// 								</h4>
// 								<Input
// 									onKeyDown={handleKeyDown}
// 									id="decimalInput"
// 									inputMode="decimal"
// 									value={price}
// 									onChange={handleChange}
// 									placeholder="0.00"
// 									className="number-input"
// 								/>
// 								{error && typeof error === "string" && (
// 									<FormMessage>{error}</FormMessage>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 					<div className="col-span-2 lg:col-span-1 grid gap-4">
// 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// 							<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
// 								Organization
// 							</h4>
// 							<CategorySelector
// 								onCategorySelect={(categoryId) => {
// 									setSelectedCategoryId(categoryId);
// 								}}
// 								form={form}
// 							/>
// 						</div>
// 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// 							{mounted && (
// 								<TagsManagement
// 									onTagsChange={handleTagsChange}
// 									initialTags={["Casual", "Summer"]}
// 								/>
// 							)}
// 						</div>
// 						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
// 							<ColorsSelector
// 								onColorsChange={(color) =>
// 									setAvailableColors(color)
// 								}
// 							/>
// 						</div>
// 						<Button type="submit" size="lg" className="lg:hidden">
// 							Create product
// 						</Button>
// 					</div>
// 				</div>
// 			</form>
// 		</Form>
// 	);
// }

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
import { ColorsSelector } from "../ColorsManagement";
import { toast } from "@/hooks/use-toast";
import { formatMoneyInput, handleKeyDown } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { CategorySelector } from "@/app/(admin)/components/CategorySelector";
import Image from "next/image";
import TagsManagement from "../TagsManagement";
import { createNewProduct } from "@/lib/actions/product.actions";

const FormSchema = z.object({
	name: z.string().min(2),
	description: z.string().min(10),
	category: z.string().min(2),
});

interface Props {
	userId: string;
}

export function ProductForm({ userId }: Props) {
	const [price, setPrice] = useState("");
	// Initialize with empty array, not undefined
	const [availableColors, setAvailableColors] = useState();
	const [selectedCategoryId, setSelectedCategoryId] = useState("");
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>([]);
	const [error, setError] = useState<boolean | string>(false);
	const [imageError, setImageError] = useState<boolean | string>(false);
	const [productTags, setProductTags] = useState([]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			description: "",
			category: "",
		},
	});

	const updateFormTags = (newTags: any) => {
		setProductTags(newTags);
		console.log(newTags);
		// form.setValue("tags", newTags);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		// If the input starts with a "0" and is followed by another number, remove the "0"
		if (
			inputValue.startsWith("0") &&
			inputValue.length > 1 &&
			inputValue[1] !== "."
		) {
			inputValue = inputValue.slice(1);
		}

		// Prevent the input from starting with a period
		if (inputValue.startsWith(".")) {
			return;
		}

		inputValue = inputValue.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}

		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
			const formattedValue = formatMoneyInput(inputValue);
			setPrice(formattedValue);
			setError(false);
		} else {
			setError("Please enter an amount");
		}
		if (!inputValue) {
			setError("Please enter an amount");
		}
	};

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			if (images.length === 0) {
				setImageError(
					"Please upload at least one picture for the shoe"
				);
				return;
			}

			const details = {
				name: data.name,
				description: data.description,
				price,
				category: selectedCategoryId,
				tags: productTags,
				userId,
				availableColors,
				media: images,
			};

			// Uncomment the following line when ready to submit
			const res = await createNewProduct(details);

			console.log(res);

			toast({
				title: "Success!",
				description: "Product created successfully!",
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid-cols-1 grid gap-4 lg:grid-cols-3">
					<div className="col-span-2 grid gap-4">
						<div>
							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Product
								</h4>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Name <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter shoe name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Description <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell us a little bit about the shoe"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Media <RequiredAsterisk />
								</h4>
								<FileUpload
									showTitle={false}
									loading={imageLoading}
									onChange={(files) => {
										const reader = new FileReader();
										reader.readAsDataURL(files[0]);
										reader.onload = async () => {
											try {
												setImageLoading(true);
												const base64Image =
													reader.result as string;
												setImages((prev) => [
													...prev,
													base64Image,
												]);
												setImageError(false);
											} catch (error) {
												console.error(
													"Error uploading image:",
													error
												);
											} finally {
												setImageLoading(false);
											}
										};
									}}
								/>
								<div className="flex flex-wrap gap-4">
									{images.map((img, idx) => (
										<Image
											key={idx}
											src={img}
											alt={`Product image ${idx + 1}`}
											width={1000}
											height={1000}
											className="size-20 rounded-md object-cover"
										/>
									))}
								</div>
								{imageError && (
									<FormMessage>{imageError}</FormMessage>
								)}
							</div>
							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Pricing <RequiredAsterisk />
								</h4>
								<Input
									onKeyDown={handleKeyDown}
									id="decimalInput"
									inputMode="decimal"
									value={price}
									onChange={handleChange}
									placeholder="0.00"
									className="number-input"
								/>
								{error && typeof error === "string" && (
									<FormMessage>{error}</FormMessage>
								)}
							</div>
						</div>
					</div>
					<div className="col-span-2 lg:col-span-1 grid gap-4">
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
							<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
								Organization
							</h4>
							<CategorySelector
								onCategorySelect={(categoryId) => {
									setSelectedCategoryId(categoryId);
								}}
								form={form}
							/>
						</div>
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
							<TagsManagement
								initialTags={productTags}
								onChange={updateFormTags}
							/>
						</div>
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
							<ColorsSelector
								onColorsChange={(color: any) =>
									setAvailableColors(color)
								}
							/>
						</div>
						<Button type="submit" size="lg" className="lg:hidden">
							Create product
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
