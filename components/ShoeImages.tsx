import Image from "next/image";

export const ShoeImages = () => {
	return (
		<div>
			<Image
				src={"/assets/images/sneakers.jpg"}
				alt={"Sneakers"}
				width={1000}
				height={1000}
				className="size-auto aspect-auto rounded-lg"
			/>
		</div>
	);
};
