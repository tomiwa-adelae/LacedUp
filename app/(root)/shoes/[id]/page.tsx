import { redirect } from "next/navigation";
import { Reviews } from "@/components/Reviews";
import { ShopNew } from "@/components/ShopNew";
import { ShoeImages } from "@/components/ShoeImages";
import { Separator } from "@/components/ui/separator";
import { ShoeDetails } from "@/components/ShoeDetails";
import { SimilarShoes } from "@/components/SimilarShoes";
import { ShoeBreadCrumbs } from "@/components/shared/ShoeBreadCrumbs";
import {
	getNewProducts,
	getProductDetails,
	getSimilarProducts,
} from "@/lib/actions/product.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { Header } from "@/components/shared/Header";

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const product = await getProductDetails({
		productId: id,
	});
	const newProducts = await getNewProducts({});
	const similarProducts = await getSimilarProducts({
		category: product.product.category,
		productId: id,
	});

	if (newProducts.status === 400 || product.status === 400)
		redirect("/not-found");

	return (
		<div className="bg-white dark:bg-black py-4">
			<Header user={user?.user} />
			<ShoeBreadCrumbs
				categoryName={product?.product?.category.name}
				categoryId={product?.product?.category._id}
				productName={product?.product?.name}
			/>
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
				<ShoeImages
					images={product?.product?.media}
					name={product?.product?.name}
				/>
				<ShoeDetails
					id={product?.product?._id}
					name={product.product?.name}
					description={product.product?.description}
					price={product?.product?.price}
					availableColors={product?.product?.availableColors}
					category={product?.product?.category}
					media={product?.product?.media}
				/>
			</div>
			<div className="container">
				<Separator />
			</div>
			<Reviews />
			<div className="container">
				<Separator />
			</div>
			{similarProducts?.products?.length !== 0 && (
				<>
					<SimilarShoes products={similarProducts?.products} />
					<div className="container">
						<Separator />
					</div>
				</>
			)}
			<ShopNew products={newProducts?.products} />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
