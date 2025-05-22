"use client";
import Image from "next/image";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ShoeImages = ({
	images,
	name,
}: {
	images: any[];
	name: string;
}) => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const lightboxSlides =
		images?.map((image: { url: string }) => ({
			src: image.url,
		})) || [];

	return (
		<div className="w-full flex flex-col items-center gap-4">
			{/* Main Image */}
			<div className="w-full max-w-2xl aspect-square relative">
				<Image
					src={images[0].url}
					alt={`${name}'s picture`}
					fill
					className="object-cover rounded-lg cursor-pointer"
					onClick={() => {
						handleOpen(0);
					}}
				/>
			</div>

			{/* Thumbnails Scroll Area */}
			<ScrollArea className="w-full max-w-2xl">
				<div className="flex space-x-4 overflow-x-auto pr-10 pb-2">
					{images.slice(1).map((img: any, idx: number) => (
						<div
							key={idx}
							className="relative size-20 shrink-0 border-2 rounded-lg p-4"
							onClick={() => {
								handleOpen(idx);
							}}
						>
							<Image
								src={img.url}
								alt={`${name}'s picture`}
								fill
								className="object-cover rounded-md cursor-pointer"
							/>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={lightboxSlides}
					index={currentIndex}
				/>
			)}
		</div>
	);
};
