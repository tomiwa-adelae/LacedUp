import { redirect } from "next/navigation";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { Separator } from "@/components/ui/separator";
import { ShoeCard } from "@/components/shared/ShoeCard";
import { Showcase } from "@/components/shared/Showcase";
import { AllCategoryBox } from "@/components/AllCategoryBox";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAllCategories } from "@/lib/actions/category.actions";
import { IProduct } from "@/lib/database/models/product.model";
import { CategoryBreadCrumbs } from "@/components/CategoryBreadCrumbs";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

const page = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) => {
	const { query, page } = await searchParams;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const products = await getAllProducts({
		query,
		page,
		limit: DEFAULT_LIMIT,
	});
	const categoryList = await getAllCategories();

	if (products.status === 400) redirect("/not-found");

	return (
		<div className="bg-white dark:bg-black py-4 relative">
			<Header search={true} user={user?.user} />
			<CategoryBreadCrumbs categoryName={"All"} />
			<Showcase title={"All products"} />
			<div className="container">
				<Separator />
			</div>
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
				<div className="col-span-2 lg:col-span-1">
					<AllCategoryBox categories={categoryList} />
				</div>
				<div className="col-span-2 gap-4 grid grid-cols-2">
					{products?.products?.map(
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
						{products?.totalPages! > 1 && (
							<Pagination
								totalPages={products?.totalPages}
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
