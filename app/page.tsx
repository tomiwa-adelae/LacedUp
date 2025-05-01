import { BestSellers } from "@/components/BestSellers";
import { PopularShoes } from "@/components/PopularShoes";
import JoinWaitlist from "@/components/shared/JoinWaitlist";
import { Showcase } from "@/components/shared/Showcase";
import { ShopCategory } from "@/components/ShopCategory";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div>
			<Showcase
				title={
					<>
						Lace up &{" "}
						<span className="text-primary">Stand out.</span>
					</>
				}
				description="Discover premium footwear for every occasion. From
						limited edition sneakers to timeless classics, find your
						perfect pair at LacedUp and elevate your stride."
				cta={[{ slug: "/new", label: "Shop now" }]}
				image={"/assets/images/showcase-img.png"}
			/>
			<div className="container">
				<Separator />
			</div>
			<ShopNew />
			<div className="container">
				<Separator />
			</div>
			<ShopCategory />
			<div className="container">
				<Separator />
			</div>
			<BestSellers />
			<div className="container">
				<Separator />
			</div>
			<PopularShoes />
			<JoinWaitlist />
		</div>
	);
};

export default page;
