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
import { formatMoneyInput, handleKeyDown, removeCommas } from "@/lib/utils";
import React, { useState } from "react";
import { CategorySelector } from "@/app/(admin)/components/CategorySelector";
import Image from "next/image";
import TagsManagement, { Tag } from "../TagsManagement";
import { createNewProduct, updateProduct } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";
import { IMedia, IProduct } from "@/lib/database/models/product.model";
import { X } from "lucide-react";
import { DeleteImageModal } from "@/app/(admin)/components/DeleteImageModal";
import { ProductFormSchema } from "@/lib/validations";

interface Props {
	userId: string;
	edit: boolean;
	product: IProduct;
}

export function ProductForm({ userId, product, edit }: Props) {
	const router = useRouter();

	const [price, setPrice] = useState(edit ? product?.price : "");
	const [availableColors, setAvailableColors] = useState(
		edit ? product.availableColors : null
	);
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>([]);
	const [existingImages, setExistingImages] = useState<IMedia[]>(
		edit ? product?.media : []
	);
	const [imageError, setImageError] = useState<boolean | string>(false);

	const [productTags, setProductTags] = useState<Tag[]>(
		edit && Array.isArray(product?.tags) ? product.tags : []
	);
	const [openDeleteImageModal, setOpenDeleteImageModal] = useState(false);
	const [openDeleteImage, setOpenDeleteImage] = useState();

	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			name: edit ? product.name : "",
			description: edit ? product.description : "",
			category: edit ? product?.category?._id.toString() : "",
			price: edit ? product.price : "",
			media: edit ? product?.media.map((m) => m.url) : [],
		},
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: any
	) => {
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
			field.onChange(formattedValue);
		}
	};

	async function onSubmit(data: z.infer<typeof ProductFormSchema>) {
		try {
			const formattedPrice = removeCommas(data.price);

			const details = {
				name: data.name,
				description: data.description,
				price: formattedPrice,
				category: data.category,
				tags: productTags,
				userId,
				availableColors,
				media: data.media,
				existingMedia: existingImages,
			};

			let res;

			if (edit) {
				res = await updateProduct({ productId: product?._id, details });
			} else {
				res = await createNewProduct(details);
			}

			if (res?.status === 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res.message,
			});
			router.push(
				`/products/${res?.product._id}?${
					edit ? "edit-success=true" : "success=true"
				}`
			);
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="fixed w-[calc(100vw-16rem)] py-2 flex items-center justify-center h-16 min-w-screen lg:min-w-auto bg-white dark:bg-black z-40">
						<div className="container">
							<div className="flex w-full items-center justify-between gap-4">
								<Button
									onClick={() => router.back()}
									variant="ghost"
									size="md"
									className="rounded-lg"
								>
									Back
								</Button>
								<Button
									disabled={form.formState.isSubmitting}
									type="submit"
									size="md"
									className="hidden lg:block"
								>
									{form.formState.isSubmitting
										? edit
											? "Updating..."
											: "Creating..."
										: edit
										? "Update"
										: "Create"}
								</Button>
							</div>
						</div>
					</div>
					<div className="container pt-16">
						<div className="grid-cols-1 grid gap-4 lg:grid-cols-3 pt-4">
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
														Name{" "}
														<RequiredAsterisk />
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
														Description{" "}
														<RequiredAsterisk />
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
											Media
										</h4>
										<FormField
											control={form.control}
											name="media"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Image{" "}
														<RequiredAsterisk />
													</FormLabel>
													<div className="border border-input rounded-md mt-3 bg-background p-4">
														<FileUpload
															showTitle={false}
															loading={
																imageLoading
															}
															onChange={(
																files
															) => {
																const reader =
																	new FileReader();
																reader.readAsDataURL(
																	files[0]
																);
																reader.onload =
																	() => {
																		try {
																			setImageLoading(
																				true
																			);
																			const base64Image =
																				reader.result as string;
																			setImages(
																				(
																					prev
																				) => [
																					base64Image,
																					...prev,
																				]
																			);
																			setImageError(
																				false
																			);
																			// Update Zod form field value
																			field.onChange(
																				[
																					base64Image,
																					...images,
																				]
																			);
																		} catch (error) {
																			console.error(
																				"Error uploading image:",
																				error
																			);
																		} finally {
																			setImageLoading(
																				false
																			);
																		}
																	};
															}}
														/>
													</div>
													<FormMessage />
													<div className="flex flex-wrap gap-4">
														{images.map(
															(img: any, idx) => (
																<div
																	key={idx}
																	className="relative"
																>
																	<Image
																		src={
																			img
																		}
																		alt={`Product image ${
																			idx +
																			1
																		}`}
																		width={
																			1000
																		}
																		height={
																			1000
																		}
																		className="size-20 rounded-md object-cover"
																	/>
																	<Button
																		type="button"
																		variant="ghost"
																		size="sm"
																		className="h-4 w-4 p-0 hover:bg-transparent absolute top-1 right-1"
																		onClick={(
																			e
																		) => {
																			e.stopPropagation();
																			const updatedImages =
																				images.filter(
																					(
																						_,
																						i
																					) =>
																						i !==
																						idx
																				);
																			setImages(
																				updatedImages
																			);
																			field.onChange(
																				updatedImages
																			);
																		}}
																	>
																		<X className="h-3 w-3" />
																		<span className="sr-only">
																			Remove
																			image
																		</span>
																	</Button>
																</div>
															)
														)}
														{existingImages.map(
															(img: any, idx) => (
																<div
																	key={idx}
																	className="relative"
																>
																	<Image
																		src={
																			img.url
																		}
																		alt={`Product image ${
																			idx +
																			1
																		}`}
																		width={
																			1000
																		}
																		height={
																			1000
																		}
																		className="size-20 rounded-md object-cover"
																	/>
																	<Button
																		type="button"
																		variant="ghost"
																		size="sm"
																		className="h-4 w-4 p-0 hover:bg-transparent absolute top-1 right-1"
																		onClick={(
																			e
																		) => {
																			e.stopPropagation();
																			setOpenDeleteImageModal(
																				true
																			);
																			setOpenDeleteImage(
																				img
																			);
																		}}
																	>
																		<X className="h-3 w-3" />
																		<span className="sr-only">
																			Delete
																			image
																		</span>
																	</Button>
																</div>
															)
														)}
													</div>
												</FormItem>
											)}
										/>

										{imageError && (
											<FormMessage>
												{imageError}
											</FormMessage>
										)}
									</div>
									<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
										<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
											Pricing
										</h4>
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Price{" "}
														<RequiredAsterisk />
													</FormLabel>
													<Input
														onKeyDown={
															handleKeyDown
														}
														id="decimalInput"
														inputMode="decimal"
														value={price}
														onChange={(e) =>
															handleChange(
																e,
																field
															)
														}
														placeholder="0.00"
														className="number-input"
													/>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="col-span-2 lg:col-span-1 grid gap-4">
								<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
									<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
										Organization
									</h4>
									<CategorySelector form={form} />
								</div>
								<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
									<TagsManagement
										initialTags={productTags}
										onChange={(selectedTags: any) =>
											setProductTags(selectedTags)
										}
									/>
								</div>
								<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
									<ColorsSelector
										onColorsChange={(color: any) =>
											setAvailableColors(color)
										}
										initialColors={
											edit ? product.availableColors : []
										}
									/>
								</div>
								<Button
									disabled={form.formState.isSubmitting}
									type="submit"
									size="lg"
									className="lg:hidden"
								>
									{form.formState.isSubmitting
										? edit
											? "Updating..."
											: "Creating..."
										: edit
										? "Update"
										: "Create"}
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Form>
			{openDeleteImageModal && (
				<DeleteImageModal
					productId={product._id}
					open={openDeleteImageModal}
					closeModal={(updatedMedia: any) => {
						setOpenDeleteImageModal(false);
						if (updatedMedia) {
							setExistingImages(updatedMedia);
						}
					}}
					existingImages={existingImages}
					image={openDeleteImage}
					userId={userId}
				/>
			)}
		</div>
	);
}
