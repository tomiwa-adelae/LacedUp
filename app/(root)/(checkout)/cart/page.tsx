import { redirect } from "next/navigation";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { CartWrapper } from "../components/CartWrapper";
import { getNewProducts } from "@/lib/actions/product.actions";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const newProducts = await getNewProducts({});

	if (newProducts.status === 400) redirect("/not-found");

	return (
		<div className="relative">
			<Header user={user?.user} />
			<CartWrapper />
			<div className="container mt-8">
				<Separator />
			</div>
			<ShopNew products={newProducts.products} />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
