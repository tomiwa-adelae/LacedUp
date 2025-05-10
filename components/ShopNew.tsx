import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoeCard } from "./shared/ShoeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadMore from "./shared/LoadMore";
import { IProduct } from "@/lib/database/models/product.model";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
	products: IProduct[];
}

export const ShopNew = ({ products = [] }: Props) => {
	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						New Arrivals
					</h2>
					{products.length > DEFAULT_LIMIT && (
						<Button asChild size="md" variant={"ghost"}>
							<Link href="/new">
								View all <ChevronRight />
							</Link>
						</Button>
					)}
				</div>
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
						{products.length > DEFAULT_LIMIT && <LoadMore />}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
};
