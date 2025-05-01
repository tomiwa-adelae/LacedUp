import { CategoryBreadCrumbs } from "@/components/CategoryBreadCrumbs";
import { Filter } from "@/components/shared/Filter";
import { FilterModal } from "@/components/shared/FilterModal";
import LoadMore from "@/components/shared/LoadMore";
import { ShoeCard } from "@/components/shared/ShoeCard";
import { Showcase } from "@/components/shared/Showcase";
import { ShopNew } from "@/components/ShopNew";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const page = () => {
	const shoes = [
		{},
		{},
		{},
		{},
		{},
		{},
		{}, // Mock shoe data; replace with actual shoe objects
	];
	const isEven = shoes.length % 2 === 0;
	return (
		<div className="bg-white dark:bg-black py-4 relative">
			{/* <CategoryBreadCrumbs /> */}
			<Showcase
				title="Men's shoes"
				image={"/assets/images/men-shoe-transparent.png"}
			/>
			<div className="container">
				<Separator />
			</div>
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
				<div className="col-span-2 lg:col-span-1">
					<Filter />
					<FilterModal />
				</div>
				<div className="col-span-2 gap-4 grid grid-cols-2">
					{shoes.map((_, index) => (
						<ShoeCard key={index} />
					))}
					<div
						className={`flex flex-col items-center justify-center gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] aspect-auto w-full rounded-lg object-cover hover:bg-accent dark:hover:bg-accent/50 cursor-pointer ${
							isEven && "col-span-2"
						}`}
					>
						<Button variant={"ghost"} size={"lg"}>
							Load more
						</Button>
					</div>
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
			<ShopNew />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
