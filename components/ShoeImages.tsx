import { DEFAULT_PRODUCT_IMAGE } from "@/constants";
import { IMedia } from "@/lib/database/models/product.model";
import Image from "next/image";

interface Props {
	media: IMedia[];
	name: string;
}

export const ShoeImages = ({ media, name }: Props) => {
	return (
		<div>
			<Image
				src={media[0].url || DEFAULT_PRODUCT_IMAGE}
				alt={`${name}'s picture`}
				width={1000}
				height={1000}
				className="size-full aspect-auto object-cover rounded-lg"
			/>
		</div>
	);
};
