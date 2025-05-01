import Image from "next/image";
import Link from "next/link";

interface Props {
	image: string;
	category: string;
}

const Category = ({ image, category }: Props) => {
	return (
		<Link href="/category/men" className="group">
			<Image
				src={image}
				alt={category}
				width={1000}
				height={1000}
				className="aspect-square size-[200px] lg:size-[250px] rounded-lg object-cover"
			/>
			<p className="mt-4 text-sm lg:text-base font-medium mb-1 group-hover:text-primary transition-all text-center">
				{category}
			</p>
		</Link>
	);
};

export default Category;
