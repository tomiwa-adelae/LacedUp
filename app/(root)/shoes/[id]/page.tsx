import { Reviews } from "@/components/Reviews";
import { ShoeBreadCrumbs } from "@/components/shared/ShoeBreadCrumbs";
import { ShoeDetails } from "@/components/ShoeDetails";
import { ShoeImages } from "@/components/ShoeImages";
import { ShopNew } from "@/components/ShopNew";
import { SimilarShoes } from "@/components/SimilarShoes";
import { Separator } from "@/components/ui/separator";
import {
	getNewProducts,
	getProductDetails,
} from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: any }) => {
	const { id } = await params;

	const product = await getProductDetails({
		productId: id,
	});
	const newProducts = await getNewProducts({});

	if (newProducts.status === 400 || product.status === 400)
		redirect("/not-found");

	return (
		<div className="bg-white dark:bg-black py-4">
			<ShoeBreadCrumbs
				categoryName={product.product.category.name}
				categoryId={product.product.category._id}
				productName={product.product.name}
			/>
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
				<ShoeImages
					media={product.product.media}
					name={product.product.name}
				/>
				<ShoeDetails
					id={product.product._id}
					name={product.product.name}
					description={product.product.description}
					price={product.product.price}
					availableColors={product.product.availableColors}
					category={product.product.category}
					media={product.product.media}
				/>
			</div>
			<div className="container">
				<Separator />
			</div>
			<Reviews />
			<div className="container">
				<Separator />
			</div>
			{/* <SimilarShoes /> */}
			<div className="container">
				<Separator />
			</div>
			<ShopNew products={newProducts.products} />
			<Separator />
		</div>
	);
};

export default page;
