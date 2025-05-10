"use client";

import { useEffect, useRef, useState } from "react";
import { Delete, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { AvailableColors } from "./AvailableColors";
import { ProductTags } from "./ProductTags";
import Link from "next/link";
import { formatMoneyInput } from "@/lib/utils";
import { DeleteProductModal } from "./DeleteProductModal";

interface Props {
	id: string;
	name: string;
	description: string;
	category: string;
	price: string;
	userId: string;
	tags: any;
	availableColors: any;
}

export const ProductDetails = ({
	id,
	name,
	category,
	price,
	description,
	tags,
	availableColors,
	userId,
}: Props) => {
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const [showFixedButton, setShowFixedButton] = useState(true);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

	return (
		<div>
			<h1 className="leading-tight text-2xl lg:text-3xl font-semibold">
				{name}
			</h1>
			<p className="text-sm lg:text-base text-muted-foreground dark:text-gray-200 mt-2">
				{description}
			</p>

			<div className="flex items-center justify-between gap-4 mt-4">
				<h2 className="font-semibold text-xl lg:text-2xl">
					₦{formatMoneyInput(price)}
				</h2>
			</div>
			<Separator className="my-6" />
			<div>
				<Label className="mb-3">Category: {category}</Label>
			</div>

			<Separator className="my-6" />
			<div>
				<AvailableColors colorOptions={availableColors} />
			</div>
			<Separator className="my-6" />
			<div>
				<ProductTags tags={tags} />
			</div>
			<Separator className="my-6" />

			{/* Static button at bottom of product section */}
			<div
				className="flex items-center gap-2 mt-4 w-full"
				ref={buttonRef}
			>
				<div className="w-full">
					<Button asChild className="w-full" size="md">
						<Link href={`/products/new?edit=true&id=${id}`}>
							<Edit />
							Edit
						</Link>
					</Button>
				</div>
				<div className="w-full">
					<Button
						variant={"destructive"}
						className="w-full"
						size="md"
						onClick={() => setOpenDeleteModal(true)}
					>
						<Trash />
						Delete
					</Button>
				</div>
			</div>

			{/* Fixed button at bottom of screen */}
			{showFixedButton && (
				<div className="fixed md:hidden bg-white dark:bg-black border-t w-full py-2 bottom-0 left-0 z-50">
					<div className="container flex items-center gap-2 mt-4">
						<div className="w-full">
							<Button asChild className="w-full" size="md">
								<Link href={`/products/new?edit=true&id=${id}`}>
									<Edit />
									Edit
								</Link>
							</Button>
						</div>
						<div className="w-full">
							<Button
								variant={"destructive"}
								className="w-full"
								size="md"
								onClick={() => setOpenDeleteModal(true)}
							>
								<Delete />
								Delete
							</Button>
						</div>
					</div>
				</div>
			)}
			{openDeleteModal && (
				<DeleteProductModal
					productId={id}
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
