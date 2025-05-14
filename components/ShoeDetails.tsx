"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

import { ColorSelector } from "./shared/ColorSelector";
import { Label } from "./ui/label";
import { SelectQuantity } from "./shared/SelectQuantity";
import { Separator } from "./ui/separator";
import { IAvailableColor, IMedia } from "@/lib/database/models/product.model";
import { formatMoneyInput } from "@/lib/utils";
import { SelectSizes } from "./shared/SelectSizes";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants";

interface Props {
	id: string;
	name: string;
	description: string;
	price: string;
	category: { name: string };
	availableColors: IAvailableColor[];
	media: IMedia[];
}

export const ShoeDetails = ({
	name,
	description,
	price,
	availableColors,
	category,
	id,
	media,
}: Props) => {
	const router = useRouter();

	const buttonRef = useRef<HTMLDivElement | null>(null);
	const [showFixedButton, setShowFixedButton] = useState(true);

	// const [quantity, setQuantity] = useState(1);
	// const [selectedSize, setSelectedSize] = useState("38");
	// const [selectedColor, setSelectedColor] = useState<IAvailableColor>(
	// 	availableColors[0]
	// );

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setShowFixedButton(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 1.0,
			}
		);

		if (buttonRef.current) {
			observer.observe(buttonRef.current);
		}

		return () => {
			if (buttonRef.current) {
				observer.unobserve(buttonRef.current);
			}
		};
	}, []);

	const addToCart = () => {
		if (!quantity)
			return toast({
				title: "Error!",
				variant: "destructive",
				description: "Please select a quantity",
			});
		if (!selectedSize)
			return toast({
				title: "Error!",
				variant: "destructive",
				description: "Please select a size",
			});
		if (!selectedColor)
			return toast({
				title: "Error!",
				variant: "destructive",
				description: "Please select a color",
			});

		router.push(
			`/cart?id=${id}&color=${selectedColor}&size=${selectedSize}`
		);
	};

	// const {
	// 	quantity,
	// 	setQuantity,
	// 	selectedSize,
	// 	setSelectedSize,
	// 	selectedColor,
	// 	setSelectedColor,
	// 	handleAddToCart,
	// } = useAddToCart({
	// 	id: id,
	// 	name: name,
	// 	price: price,
	// 	image: media[0].url,
	// });

	// Get cart functionality from our custom hook
	const {
		quantity,
		setQuantity,
		selectedSize,
		setSelectedSize,
		selectedColor,
		setSelectedColor,
		handleAddToCart,
	} = useAddToCart({
		id: id,
		name: name,
		price: parseFloat(price), // Convert price string to number
		image: media[0]?.url || DEFAULT_PRODUCT_IMAGE, // Add fallback for empty media
		category: category.name,
	});

	return (
		<div>
			<h1 className="leading-relaxed text-3xl lg:text-4xl font-semibold">
				{name}
			</h1>
			<p className="text-base text-muted-foreground dark:text-gray-200">
				{description}
			</p>

			<div className="flex items-center justify-between gap-4 mt-4">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					₦{formatMoneyInput(price)}
				</h2>
				<Button size="icon" variant={"outline"}>
					<Heart />
				</Button>
			</div>
			<Separator className="my-6" />
			<div>
				<Label className="mb-3 capitalize">
					Category: {category?.name}
				</Label>
			</div>
			<Separator className="my-6" />
			<ColorSelector
				availableColors={availableColors}
				selectedColor={selectedColor}
				setSelectedColor={setSelectedColor}
			/>
			<Separator className="my-6" />
			<SelectSizes
				selectedSize={selectedSize}
				setSelectedSize={setSelectedSize}
			/>
			<Separator className="my-6" />
			<SelectQuantity quantity={quantity} setQuantity={setQuantity} />
			{/* Static button at bottom of product section */}
			<div ref={buttonRef}>
				<Button onClick={handleAddToCart} className="w-full" size="lg">
					Add to cart
				</Button>
			</div>

			{/* Fixed button at bottom of screen */}
			{showFixedButton && (
				<div className="fixed md:hidden w-full bg-white dark:bg-black border-t py-2 bottom-0 left-0 z-50">
					<div className="container">
						<Button className="w-full" size="lg">
							Add to cart
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
