import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoeCard } from "./shared/ShoeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadMore from "./shared/LoadMore";

export const BestSellers = () => {
	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						Best Sellers
					</h2>
					<Button asChild size="md" variant={"ghost"}>
						<Link href="/new">
							View all <ChevronRight />
						</Link>
					</Button>
				</div>
				<ScrollArea className="">
					<div className="flex w-max space-x-4 pt-4 pr-10 pb-4">
						<ShoeCard ratings={true} />
						<ShoeCard />
						<ShoeCard />
						<ShoeCard />
						<ShoeCard />
						<ShoeCard />
						<ShoeCard />
						<ShoeCard />
						<LoadMore />
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
};
