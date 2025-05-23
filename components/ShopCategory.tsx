import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import Category from "./shared/Category";
import { ChevronRight } from "lucide-react";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ShopCategory = async () => {
	const allCategories = await getAllCategories();

	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						Shop by category
					</h2>
					<Button asChild size="md" variant={"ghost"}>
						<Link href="/category/all">
							View all <ChevronRight />
						</Link>
					</Button>
				</div>
				<ScrollArea className="">
					<div className="flex w-max space-x-4 pt-4 pr-10 pb-8">
						<Link href={`/category/all`} className="group">
							<Image
								src={"/assets/images/showcase-img.png"}
								alt={"LacedUP Shoes"}
								width={1000}
								height={1000}
								className="aspect-square size-[200px] lg:size-[250px] rounded-lg object-cover"
							/>
							<p className="mt-4 text-sm lg:text-base font-medium mb-1 group-hover:text-primary transition-all text-center">
								All
							</p>
						</Link>
						{allCategories?.map(
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
