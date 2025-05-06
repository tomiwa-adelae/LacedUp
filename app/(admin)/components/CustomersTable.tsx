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
import { EllipsisVertical } from "lucide-react";
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

export const CustomersTable = () => {
	return (
		<div className="mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead className="text-center">
							Joined date
						</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoices.map(
						({ image, name, price, date, totalOrder }, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium flex items-center justify-start  gap-2">
									<Image
										src={image}
										alt={name}
										width={1000}
										height={1000}
										className="rounded-full object-cover size-10"
									/>
									<span className="line-clamp-2">{name}</span>
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
	);
};
