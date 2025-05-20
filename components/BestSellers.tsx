import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoeCard } from "./shared/ShoeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadMore from "./shared/LoadMore";
import { IProduct } from "@/lib/database/models/product.model";

interface Props {
	products: IProduct[];
}

export const BestSellers = ({ products = [] }: Props) => {
	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<h2 className="text-xl md:text-2xl uppercase font-semibold">
					Best Sellers
				</h2>

				<ScrollArea className="">
					<div className="flex w-max space-x-4 pt-4 pr-10 pb-4">
						{products.map(
							(
								{
									name,
									_id,
									media,
									price,
									availableColors,
									tags,
									category,
								},
								index
							) => (
								<ShoeCard
									key={index}
									name={name}
									price={price}
									media={media}
									availableColors={availableColors}
									tags={tags}
									id={_id}
									category={category}
								/>
							)
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
};
