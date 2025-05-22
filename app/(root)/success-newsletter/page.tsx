import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { Showcase } from "@/components/shared/Showcase";
import { ShopCategory } from "@/components/ShopCategory";
import { getNewProducts } from "@/lib/actions/product.actions";

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
