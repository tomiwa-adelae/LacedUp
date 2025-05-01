import { Reviews } from "@/components/Reviews";
import { ShoeBreadCrumbs } from "@/components/shared/ShoeBreadCrumbs";
import { ShoeDetails } from "@/components/ShoeDetails";
import { ShoeImages } from "@/components/ShoeImages";
import { ShopNew } from "@/components/ShopNew";
import { SimilarShoes } from "@/components/SimilarShoes";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div className="bg-white dark:bg-black py-4">
			<ShoeBreadCrumbs />
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
				<ShoeImages />
				<ShoeDetails />
			</div>
			<div className="container">
				<Separator />
			</div>
			<Reviews />
			<div className="container">
				<Separator />
			</div>
			<SimilarShoes />
			<div className="container">
				<Separator />
			</div>
			<ShopNew />
			<Separator />
		</div>
	);
};

export default page;
