import { Reviews } from "@/components/Reviews";
import { ShoeBreadCrumbs } from "@/components/shared/ShoeBreadCrumbs";
import { ShoeDetails } from "@/components/ShoeDetails";
import { ShoeImages } from "@/components/ShoeImages";
import { ShopNew } from "@/components/ShopNew";
import { SimilarShoes } from "@/components/SimilarShoes";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
	return (
		<div className="bg-white dark:bg-black py-4">
			<div className="container">
				<ShoeBreadCrumbs />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
					<ShoeImages />
					<ShoeDetails />
				</div>
				<Separator />
				<Reviews />
				<Separator />
				<SimilarShoes />
				<Separator />
				<ShopNew />
				<Separator />
			</div>
		</div>
	);
};

export default page;
