"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Ratings from "./Ratings";
import {
	IAvailableColor,
	IMedia,
	ITags,
} from "@/lib/database/models/product.model";
import { cn, formatMoneyInput } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants";
import { useAddToCart } from "@/hooks/use-add-to-cart";

interface Props {
	ratings?: boolean;
	name: string;
	price: string;
	media: IMedia[];
	tags: any;
	availableColors: IAvailableColor[];
	id: any;
	category: any;
}

export const ShoeCard = ({
	name,
	id,
	price,
	availableColors,
	tags,
	media,
	ratings,
	category,
}: Props) => {
	const { handleAddToCart } = useAddToCart({
		id: id,
		name: name,
		price: parseFloat(price), // Convert price string to number
		image: media[0]?.url || DEFAULT_PRODUCT_IMAGE, // Add fallback for empty media
		category: category.name,
	});

	return (
		<div className="group">
			<div className="relative group">
				<Link href={`/shoes/${id}`}>
					<Image
						src={media[0].url || DEFAULT_PRODUCT_IMAGE}
						alt={`${name}'s picture`}
						width={1000}
						height={1000}
						className={cn(
							"transition-all aspect-square w-full h-[270px] lg:h-[320px] lg:w-[400px] rounded-lg object-cover",
							media.length > 1 && "group-hover:opacity-0 "
						)}
					/>
					{media.length > 1 && (
						<Image
							src={media[1]?.url || DEFAULT_PRODUCT_IMAGE}
							alt={`${name}'s picture`}
							width={1000}
							height={1000}
							className="opacity-0 absolute top-0 left-0  group-hover:opacity-100 transition-all aspect-square w-full h-[270px] lg:h-[320px] lg:w-[400px] rounded-lg object-cover"
						/>
					)}
				</Link>
			</div>
			<div className="mt-4 pb-8">
				<Link
					href={`/shoes/${id}`}
					className="text-lg font-medium mb-1 group-hover:text-primary transition-all"
				>
					{name}
				</Link>
				<div className="space-y-1 flex items-center justify-between gap-4 text-sm text-muted-foreground dark:text-gray-200 mt-2">
					<Link
						href={`/category/${category._id}?name=${category.name}`}
						className="capitalize"
					>
						{category.name}
					</Link>
					<p>{availableColors?.length} colors</p>
				</div>
				<div className="flex items-center justify-between gap-8 my-2">
					<p className="text-lg font-medium">
						₦{formatMoneyInput(price)}
					</p>
					<Button
						className="text-xs hover:text-primary hover:underline"
						variant={"ghost"}
						size="sm"
						onClick={handleAddToCart}
					>
						Add to cart
					</Button>
				</div>
				{ratings && <Ratings />}
			</div>
		</div>
	);
};
