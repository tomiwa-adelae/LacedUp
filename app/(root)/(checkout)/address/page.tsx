import { CartSummary } from "@/components/CartSummary";
import { ShippingForm } from "@/components/forms/ShippingForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div className="relative">
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
				<div className="col-span-2">
					<h2 className="text-xl md:text-2xl uppercase font-semibold mb-4">
						Shipping Information
					</h2>
					<ShippingForm />
				</div>
				<div className="col-span-2 lg:col-span-1">
					<CartSummary
						cta={{ slug: "/proceed", label: "Proceed to pay" }}
					/>
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
