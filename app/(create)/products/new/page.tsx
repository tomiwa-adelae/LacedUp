import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { ProductForm } from "../../components/forms/ProductForm";
import { getAdminProductDetails } from "@/lib/actions/product.actions";

export const metadata: Metadata = {
	title: "Create new product | LacedUp",
	description:
		"View, add, or update product listings. Manage shoe categories, prices, stock levels, and images in your product catalog.",
	keywords:
		"manage products, update product info, shoe inventory admin, ecommerce product panel, shoe store CMS",
};

const page = async ({ searchParams }: SearchParamsProps) => {
	const { edit, id } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	let product;
	if (edit) {
		product = await getAdminProductDetails({
			productId: id,
			userId: user?.user?._id,
		});
	}

	return (
		<div>
			<ProductForm
				edit={edit}
				product={product?.product}
				userId={user.user._id}
			/>
		</div>
	);
};

export default page;
