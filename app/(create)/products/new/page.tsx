import { getUserInfo } from "@/lib/actions/user.actions";
import { ProductForm } from "../../components/forms/ProductForm";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<ProductForm userId={user.user._id} />
		</div>
	);
};

export default page;
