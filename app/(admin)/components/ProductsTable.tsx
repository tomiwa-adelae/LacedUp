"use client";
import Ratings from "@/components/shared/Ratings";
import { Button } from "@/components/ui/button";
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
import { IProduct } from "@/lib/database/models/product.model";
import { formatMoneyInput } from "@/lib/utils";
import { Edit, EllipsisVertical, Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DeleteProductModal } from "./DeleteProductModal";

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

export const ProductsTable = ({
	products,
	userId,
}: {
	products: IProduct[];
	userId: string;
}) => {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [productId, setProductId] = useState<any>();

	return (
		<div className="mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Product name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Customer ratings</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(
						({ name, price, media, category, _id }, index) => (
							<TableRow key={index}>
								<TableCell>
									<Link
										href={`/products/${_id}`}
										className="font-medium flex items-center justify-start  gap-2 group"
									>
										<Image
											src={media[0]?.url || ""}
											alt={`${name}'s picture`}
											width={1000}
											height={1000}
											className="rounded-full object-cover size-10"
										/>
										<span className="line-clamp-2 group-hover:underline group-hover:text-primary transition-all">
											{name}
										</span>
									</Link>
								</TableCell>
								<TableCell className="capitalize">
									{/* @ts-ignore */}
									{category?.name}
								</TableCell>
								<TableCell>
									{" "}
									₦{formatMoneyInput(price)}
								</TableCell>
								<TableCell>
									<Ratings />
								</TableCell>
								<TableCell>
									<div className="flex gap-2 items-center justify-end">
										<Button
											variant={"ghost"}
											size="icon"
											asChild
											className="rounded-lg"
										>
											<Link href={`/products/${_id}`}>
												<Eye />
											</Link>
										</Button>
										<Button
											variant={"ghost"}
											size="icon"
											asChild
											className="rounded-lg"
										>
											<Link
												href={`/products/new?edit=true&id=${_id}`}
											>
												<Edit />
											</Link>
										</Button>
										<Button
											variant={"destructive"}
											size="icon"
											className="rounded-lg"
											onClick={() => {
												setOpenDeleteModal(true);
												setProductId(_id!);
											}}
										>
											<Trash />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
			{openDeleteModal && (
				<DeleteProductModal
					productId={productId}
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
					}}
					userId={userId}
				/>
			)}
		</div>
	);
};
