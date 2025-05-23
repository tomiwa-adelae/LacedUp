import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { CartWrapper } from "../components/CartWrapper";
import { getNewProducts } from "@/lib/actions/product.actions";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
	title: "Your Shopping Cart – Secure Checkout | LacedUp",
	description:
		"Review your selected items, sizes, and colors. Ready for a smooth and secure checkout experience with multiple payment options including Flutterwave.",
	keywords:
		"Shoe cart, checkout shoes online, review order, secure payment Nigeria, Flutterwave shopping cart",
};

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
