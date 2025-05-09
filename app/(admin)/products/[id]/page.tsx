import React from "react";
import { ProductDetails } from "../../components/ProductDetails";
import { ProductImages } from "../../components/ProductImages";
import { Separator } from "@/components/ui/separator";
import { Reviews } from "@/components/Reviews";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAdminProductDetails } from "@/lib/actions/product.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: SearchParamsProps;
}) => {
	const clerkUser = await currentUser();
	const { id } = await params;

	const user = await getUserInfo(clerkUser?.id!);

	const product = await getAdminProductDetails({
		productId: id,
		userId: user.user._id,
	});

	if (product.status === 400) redirect("/not-found");

	return (
		<div>
			<Button
				asChild
				variant="ghost"
				size="md"
				className="rounded-lg mb-4"
			>
				<Link href="/products">Back</Link>
			</Button>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<ProductImages images={product?.product.media} />
				<ProductDetails
					id={product?.product._id}
					name={product?.product.name}
					description={product?.product.description}
					price={product?.product.price}
					category={product?.product.category.name}
					availableColors={product?.product.availableColors}
					tags={product?.product.tags}
					userId={product?.product.user}
				/>
			</div>
			<div className="mt-8">
				<Separator />
			</div>
			<Reviews />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
