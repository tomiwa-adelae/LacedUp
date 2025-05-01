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
			<Showcase />
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
