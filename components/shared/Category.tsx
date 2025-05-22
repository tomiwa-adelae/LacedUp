import Link from "next/link";
import Image from "next/image";

interface Props {
	image: string;
	name: string;
	id: string;
}

const Category = ({ id, image, name }: Props) => {
	return (
		<Link href={`/category/${id}?name=${name}`} className="group">
			<Image
				src={image}
				alt={name}
				width={1000}
				height={1000}
				className="aspect-square size-[200px] lg:size-[250px] rounded-lg object-cover"
			/>
			<p className="mt-4 text-sm lg:text-base font-medium mb-1 group-hover:text-primary transition-all text-center">
				{name}
			</p>
		</Link>
	);
};

export default Category;
