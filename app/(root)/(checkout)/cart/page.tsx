import { CartDetails } from "@/components/CartDetails";
import { CartSummary } from "@/components/CartSummary";
import { EmptyCart } from "@/components/EmptyCart";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div className="relative">
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
				<div className="col-span-2">
					<CartDetails />
				</div>
				<div className="col-span-2 lg:col-span-1">
					<CartSummary />
				</div>
			</div>
			<div className="container mt-8">
				<Separator />
			</div>
			<ShopNew />
			<div className="container">
				<Separator />
			</div>
			{/* <EmptyCart /> */}
		</div>
	);
};

export default page;
