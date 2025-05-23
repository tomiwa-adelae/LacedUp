import type { Metadata } from "next";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { Showcase } from "@/components/shared/Showcase";
import { ShopCategory } from "@/components/ShopCategory";
import { getNewProducts } from "@/lib/actions/product.actions";

export const metadata: Metadata = {
	title: "Quality Shoes Online | LacedUp",
	description:
		"Discover premium sneakers, boots, heels, and sandals at unbeatable prices. Shop quality shoes for men, women, and kids in Nigeria. Fast delivery & secure payment.",
};

const page = async () => {
	const newProducts = await getNewProducts({});

	return (
		<div>
			<Showcase
				title={
					<>
						Successfully{" "}
						<span className="text-primary">Joined!</span>
					</>
				}
				description="Thank you for joining our newsletter. You should receive an email confirmation very soon"
				cta={[
					{ slug: "/", label: "Back to shop" },
					{
						slug: `/sign-in`,
						label: "Get started",
					},
				]}
			/>
			<div className="container">
				<Separator />
			</div>
			<ShopNew products={newProducts.products} />
			<div className="container">
				<Separator />
			</div>
			<ShopCategory />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
