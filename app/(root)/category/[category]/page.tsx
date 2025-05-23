import { redirect } from "next/navigation";
import { DEFAULT_LIMIT } from "@/constants";
import { ShopNew } from "@/components/ShopNew";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/shared/Filter";
import { Separator } from "@/components/ui/separator";
import type { Metadata, ResolvingMetadata } from "next";
import { Showcase } from "@/components/shared/Showcase";
import { ShoeCard } from "@/components/shared/ShoeCard";
import { IProduct } from "@/lib/database/models/product.model";
import { getCategoryDetails } from "@/lib/actions/category.actions";
import { CategoryBreadCrumbs } from "@/components/CategoryBreadCrumbs";
import {
	getCategoryProducts,
	getNewProducts,
} from "@/lib/actions/product.actions";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { category } = await params;
	try {
		const categoryDetails = await getCategoryDetails(category);
		return {
			title: `${categoryDetails?.category?.name} - ${categoryDetails?.category?.name} | LacedUp`,
		};
	} catch (error) {
		return {
			title: "Quality Shoes Online | LacedUp",
		};
	}
}

const page = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) => {
	const { query, page, tags, minPrice, maxPrice } = await searchParams;

	const { category } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const newProducts = await getNewProducts({});
	const categoryProducts = await getCategoryProducts({
		category,
		query,
		page,
		limit: DEFAULT_LIMIT,
		tags,
		minPrice: minPrice || "",
		maxPrice: maxPrice || "",
	});
	const categoryDetails = await getCategoryDetails(category);

	if (newProducts.status === 400) redirect("/not-found");

	const categoryTags = [
		...new Set(
			categoryProducts?.products?.flatMap((product: any) =>
				product?.tags.map((t: any) => t.name)
			)
		),
	];

	return (
		<div className="bg-white dark:bg-black py-4 relative">
			<Header search={true} user={user?.user} />
			<CategoryBreadCrumbs
				categoryName={categoryDetails?.category.name}
			/>
			<Showcase
				title={categoryDetails?.category.name}
				image={categoryDetails?.category.picture}
			/>
			<div className="container">
				<Separator />
			</div>
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
				<div className="col-span-2 lg:col-span-1">
					<Filter
						categoryName={categoryDetails?.category.name}
						tags={categoryTags}
					/>
				</div>
				<div className="col-span-2 gap-4 grid grid-cols-2">
					{categoryProducts?.products?.map(
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
					{categoryProducts?.products?.length > DEFAULT_LIMIT && (
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
			<ShopNew products={newProducts?.products} />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
