import { Button } from "@/components/ui/button";
import { CircleOff, ListFilter } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IProduct } from "@/lib/database/models/product.model";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { InformationBox } from "./InformationBox";

export const TopProducts = ({ products }: { products: IProduct[] }) => {
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
				{/* <Button size="icon" variant={"ghost"}>
					<ListFilter className="size-4" />
				</Button> */}
			</div>
			<div className="mt-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product name</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Total orders</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map(
							(
								{
									media,
									name,
									price,
									createdAt,
									totalOrders,
									category,
									_id,
								},
								index
							) => (
								<TableRow key={index}>
									<TableCell>
										<Link
											href={`/products/${_id}`}
											className="font-medium flex items-center justify-start hover:text-primary hover:underline gap-2 group"
										>
											<Image
												src={
													media[0].url ||
													DEFAULT_PRODUCT_IMAGE
												}
												alt={`${name}'s picture`}
												width={1000}
												height={1000}
												className="rounded-full object-cover size-10"
											/>
											<span className="line-clamp-2">
												{name}
											</span>
										</Link>
									</TableCell>
									{/* @ts-ignore */}
									<TableCell>{category?.name}</TableCell>
									<TableCell>
										₦{formatMoneyInput(price)}
									</TableCell>
									<TableCell className="text-center">
										<Badge
											variant={
												totalOrders > 0
													? "delivered"
													: "pending"
											}
										>
											{totalOrders}
										</Badge>
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
				<div className="mt-4">
					{products?.length === 0 && (
						<InformationBox
							variant="pending"
							title="You have no products yet. Create some today"
							icon={CircleOff}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
