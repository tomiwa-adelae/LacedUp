import { getUserInfo } from "@/lib/actions/user.actions";
import { ProductForm } from "../../components/forms/ProductForm";
import { currentUser } from "@clerk/nextjs/server";
import { getAdminProductDetails } from "@/lib/actions/product.actions";

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
