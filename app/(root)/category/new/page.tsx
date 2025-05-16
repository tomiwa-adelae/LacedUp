import { CategoryBreadCrumbs } from "@/components/CategoryBreadCrumbs";
import { Filter } from "@/components/shared/Filter";
import { FilterModal } from "@/components/shared/FilterModal";
import { ShoeCard } from "@/components/shared/ShoeCard";
import { Showcase } from "@/components/shared/Showcase";
import { ShopNew } from "@/components/ShopNew";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_LIMIT, DEFAULT_PRODUCT_IMAGE } from "@/constants";
import { getCategoryDetails } from "@/lib/actions/category.actions";
import {
	getCategoryProducts,
	getNewProducts,
} from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/database/models/product.model";
import { redirect } from "next/navigation";

const page = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) => {
	const { query, page, tags, minPrice, maxPrice } = await searchParams;

	const newProducts = await getNewProducts({
		query,
		page,
		limit: DEFAULT_LIMIT,
		tags,
		minPrice: minPrice || "",
		maxPrice: maxPrice || "",
	});

	if (newProducts.status === 400) redirect("/not-found");

	const categoryTags = [
		...new Set(
			newProducts?.products?.flatMap((product: any) =>
				product?.tags.map((t: any) => t.name)
			)
		),
	];

	return (
		<div className="bg-white dark:bg-black py-4 relative">
			<CategoryBreadCrumbs categoryName={"New arrivals"} />
			<Showcase
				title={"New Arrivals"}
				image={
					newProducts?.products[0]?.media[0]?.url ||
					DEFAULT_PRODUCT_IMAGE
				}
			/>
			<div className="container">
				<Separator />
			</div>
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
				<div className="col-span-2 lg:col-span-1">
					<Filter categoryName={"/new"} tags={categoryTags} />
					<FilterModal categoryName={"/new"} tags={categoryTags} />
				</div>
				<div className="col-span-2 gap-4 grid grid-cols-2">
					{newProducts?.products?.map(
						({
							name,
							_id,
							media,
							price,
							availableColors,
							tags,
							category,
						}: IProduct) => (
							<ShoeCard
								key={Number(_id)}
								name={name}
								price={price}
								media={media}
								availableColors={availableColors}
								tags={tags}
								id={_id}
								category={category}
							/>
						)
					)}
					{newProducts?.products?.length > DEFAULT_LIMIT && (
						<div
							className={`flex flex-col items-center justify-center gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] aspect-auto w-full rounded-lg object-cover hover:bg-accent dark:hover:bg-accent/50 cursor-pointer`}
						>
							<Button variant={"ghost"} size={"lg"}>
								Load more
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
			{/* <ShopNew products={newProducts?.products} /> */}
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
