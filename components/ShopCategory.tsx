import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoeCard } from "./shared/ShoeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import Category from "./shared/Category";
import LoadMore from "./shared/LoadMore";
import { shopByCategories } from "@/constants";
import { getAllCategories } from "@/lib/actions/category.actions";

export const ShopCategory = async () => {
	const allCategories = await getAllCategories();

	// if (newProducts.status === 400) redirect("/not-found");

	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						Shop by category
					</h2>
					<Button asChild size="md" variant={"ghost"}>
						<Link href="/new">
							View all <ChevronRight />
						</Link>
					</Button>
				</div>
				<ScrollArea className="">
					<div className="flex w-max space-x-4 pt-4 pr-10 pb-8">
						{allCategories.map(
							({
								name,
								picture,
								_id,
							}: {
								name: string;
								picture: string;
								_id: string;
							}) => (
								<Category
									key={_id}
									id={_id}
									name={name}
									image={picture}
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
