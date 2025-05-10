import Image from "next/image";

export const ProductImages = ({ images }: { images: any }) => {
	return (
		<div>
			<Image
				src={images[0].url}
				alt={"Sneakers"}
				width={1000}
				height={1000}
				className="size-full object-cover aspect-square rounded-lg"
			/>
		</div>
	);
};
