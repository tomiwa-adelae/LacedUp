import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
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
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { useEffect, useState } from "react";
import { AddNewCategoryForm } from "./AddNewCategoryForm";

export const CategorySelector = ({
	form,
	onCategorySelect,
}: {
	form: any;
	onCategorySelect: (categoryId: string) => void;
}) => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);

	const fetchCategories = async () => {
		const categoryList = await getAllCategories();

		categoryList && setCategories(categoryList as ICategory[]);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<>
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
								onValueChange={(value) => {
									field.onChange(value); // update the form state
									onCategorySelect(value); // send value up to parent
								}}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.length === 0 && (
										<p className="italic text-base text-center py-8">
											No categories yet. Add new category
										</p>
									)}
									{categories.length > 0 &&
										categories.map((category) => (
											<SelectItem
												key={category._id}
												value={category._id}
												className="select-item p-regular-14"
											>
												{category.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
							<Button
								type="button"
								variant={"outline"}
								size={"sm"}
								className="rounded-md h-14"
								onClick={() => setOpenNewCategory(true)}
							>
								Add
							</Button>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
			{openNewCategory && (
				<AddNewCategoryForm
					open={openNewCategory}
					closeModal={() => {
						setOpenNewCategory(false);
						fetchCategories();
					}}
				/>
			)}
		</>
	);
};
