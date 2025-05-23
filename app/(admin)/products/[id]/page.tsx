import React from "react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Reviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { getUserInfo } from "@/lib/actions/user.actions";
import { ProductImages } from "../../components/ProductImages";
import { ProductDetails } from "../../components/ProductDetails";
import { getAdminProductDetails } from "@/lib/actions/product.actions";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const clerkUser = await currentUser();
	const { id } = await params;
	try {
		const user = await getUserInfo(clerkUser?.id!);

		const product = await getAdminProductDetails({
			productId: id,
			userId: user.user._id,
		});
		return {
			title: `${product?.product?.name} - Manage product - Admin Panel | LacedUp`,
		};
	} catch (error) {
		return {
			title: "Quality Shoes Online | LacedUp",
			description:
				"Discover premium sneakers, boots, heels, and sandals at unbeatable prices. Shop quality shoes for men, women, and kids in Nigeria. Fast delivery & secure payment.",
		};
	}
}

const page = async ({ params }: { params: any }) => {
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
