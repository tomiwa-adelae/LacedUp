import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { getNewProducts } from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";
import { CartWrapper } from "../components/CartWrapper";

const page = async () => {
	const newProducts = await getNewProducts({});

	if (newProducts.status === 400) redirect("/not-found");

	return (
		<div className="relative">
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
