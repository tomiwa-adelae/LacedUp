import { Button } from "@/components/ui/button";
import { EllipsisVertical, ListFilter } from "lucide-react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const invoices = [
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
];

export const TopProducts = () => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border col-span-2">
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg uppercase font-semibold">
						Top Products
					</h2>
					<p className="text-muted-foreground text-sm">
						Best selling products in your store
					</p>
				</div>
				<Button size="icon" variant={"ghost"}>
					<ListFilter className="size-4" />
				</Button>
			</div>
			<div className="mt-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product name</TableHead>
							<TableHead>Date added</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Total orders</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map(
							(
								{ image, name, price, date, totalOrder },
								index
							) => (
								<TableRow key={index}>
									<TableCell className="font-medium flex items-center justify-start  gap-2">
										<Image
											src={image}
											alt={name}
											width={1000}
											height={1000}
											className="rounded-full object-cover size-10"
										/>
										<span className="line-clamp-2">
											{name}
										</span>
									</TableCell>
									<TableCell>{date}</TableCell>
									<TableCell>{price}</TableCell>
									<TableCell className="text-center">
										{totalOrder}
									</TableCell>
									<TableCell>
										<EllipsisVertical className="size-5" />
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
