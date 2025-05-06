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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
import { TagsManagement } from "../TagsManagement";
import { ColorsOption, ColorsSelector } from "../ColorsManagement";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 2 characters.",
	}),
	media: z.string().min(10, {
		message: "Media must be at least 2 characters.",
	}),
	price: z.string().min(10, {
		message: "Price must be at least 2 characters.",
	}),
	category: z.string().min(10, {
		message: "Category must be at least 2 characters.",
	}),
});

export function ProductForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
		},
	});

	const handleTagsChange = (tags: string[]) => {
		console.log("Tags updated:", tags);
		// Update your form state
	};

	const handleColorsChange = (colors: ColorsOption[]) => {
		console.log("Colors updated:", colors);
		// Update your form state
	};

	function onSubmit(data: z.infer<typeof FormSchema>) {}

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
								<FormField
									control={form.control}
									name="media"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													showTitle={false}
													loading={false}
													onChange={(files) => {
														const reader =
															new FileReader();
														reader.readAsDataURL(
															files[0]
														);
														reader.onload =
															async () => {
																try {
																	const binaryString =
																		reader.result;

																	// setLoading(true);

																	// setImage(binaryString);
																} catch (error) {
																	// setLoading(false);
																} finally {
																	// setLoading(false);
																}
															};
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-4">
								<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Pricing
									<RequiredAsterisk />
								</h4>
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Enter shoe price"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
					{/* <Button type="submit">Submit</Button> */}
					<div className="col-span-2 lg:col-span-1 grid gap-4">
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
							<h4 className="font-medium text-muted-foreground text-sm lg:text-base uppercase">
								Organization
							</h4>
							<FormField
								control={form.control}
								name="category"
								render={({ field }: any) => (
									<FormItem>
										<FormLabel>
											Category <RequiredAsterisk />
										</FormLabel>
										<div className="flex items-center justify-center">
											<Select
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{/* {categories.length === 0 && (
												<p className="italic text-base text-center py-8">
													No categories yet. Add new
													category
												</p>
											)} */}
													{/* {categories.length > 0 &&
												categories.map((category) => (
													<SelectItem
														key={category._id}
														value={category._id}
														className="select-item p-regular-14"
													>
														{category.name}
													</SelectItem>
												))} */}
													<SelectItem
														value={"loafers"}
														className="select-item p-regular-14"
													>
														Loafers
													</SelectItem>
												</SelectContent>
											</Select>
											<Button
												type="button"
												variant={"outline"}
												size={"sm"}
												className="rounded-md h-14"
												onClick={() => {}}
											>
												Add
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
							<TagsManagement
								onTagsChange={handleTagsChange}
								initialTags={["Casual", "Summer"]}
							/>
						</div>
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
							<ColorsSelector
								onColorsChange={handleColorsChange}
							/>
						</div>
						<Button size="lg" className="lg:hidden">
							Create product
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { FileUpload } from "@/components/ui/file-upload";
// import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
// import { TagsManagement } from "../TagsManagement";
// import { ColorsOption, ColorsSelector } from "../ColorsManagement";

// const FormSchema = z.object({
// 	username: z.string().min(2, {
// 		message: "Username must be at least 2 characters.",
// 	}),
// });

// export function ProductForm() {
// 	const form = useForm<z.infer<typeof FormSchema>>({
// 		resolver: zodResolver(FormSchema),
// 		defaultValues: {
// 			username: "",
// 		},
// 	});

// 	const handleTagsChange = (tags: string[]) => {
// 		console.log("Tags updated:", tags);
// 		// Update your form state
// 	};

// 	const handleColorsChange = (colors: ColorsOption[]) => {
// 		console.log("Colors updated:", colors);
// 		// Update your form state
// 	};

// 	function onSubmit(data: z.infer<typeof FormSchema>) {}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 				<div>Product form</div>
// 			</form>
// 		</Form>
// 	);
// }
