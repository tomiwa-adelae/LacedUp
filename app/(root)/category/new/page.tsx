import type { Metadata } from "next";
import Pagination from "@/components/Pagination";
import { Filter } from "@/components/shared/Filter";
import { Separator } from "@/components/ui/separator";
import { ShoeCard } from "@/components/shared/ShoeCard";
import { Showcase } from "@/components/shared/Showcase";
import { IProduct } from "@/lib/database/models/product.model";
import { getNewProducts } from "@/lib/actions/product.actions";
import { DEFAULT_NEW_LIMITS, DEFAULT_PRODUCT_IMAGE } from "@/constants";
import { CategoryBreadCrumbs } from "@/components/CategoryBreadCrumbs";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
	title: "Explore new arrival Shoes  – Sneakers, Heels, Boots & More | LacedUp",
	description:
		"Browse our wide collection of stylish shoes including sneakers, formal shoes, and sandals. Quality guaranteed. Sizes from 38–50. Free delivery on select orders.",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page, tags, minPrice, maxPrice } = await searchParams;

	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const newProducts = await getNewProducts({
		query,
		page,
		limit: DEFAULT_NEW_LIMITS,
		tags,
		minPrice: minPrice || "",
		maxPrice: maxPrice || "",
	});

	// if (newProducts.status === 400) redirect("/not-found");

	const categoryTags = [
		...new Set(
			newProducts?.products?.flatMap((product: any) =>
				product?.tags.map((t: any) => t.name)
			)
		),
	];

	return (
		<div className="bg-white dark:bg-black py-4 relative">
			<Header search={true} user={user?.user} />
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
					<div className="col-span-2 ">
						{newProducts?.totalPages! > 1 && (
							<Pagination
								totalPages={newProducts?.totalPages}
								page={page}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
