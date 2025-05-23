import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
	title: string | React.ReactNode;
	description?: string;
	image?: string;
	cta?: { slug: string; label: string }[];
}

export const Showcase = ({
	title,
	description,
	cta,
	image = "/assets/images/showcase-img.png",
}: Props) => {
	return (
		<div className="dark:bg-black dark:text-white min-h-[70vh] flex items-center justify-center py-16">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col justify-center items-start">
					<h1
						style={{ fontFamily: "ClashDisplay" }}
						className="uppercase text-4xl lg:text-5xl font-semibold"
					>
						{title}
					</h1>
					<p className="text-base text-muted-foreground dark:text-gray-200 mt-4">
						{description}
					</p>
					<div className="flex flex-col md:flex-row items-center justify-start gap-4">
						{cta?.map(({ slug, label }, index) => (
							<Button
								className="w-full md:w-auto mt-6"
								asChild
								size={"lg"}
								key={index}
								variant={index === 0 ? "default" : "outline"}
							>
								<Link href={slug}>{label}</Link>
							</Button>
						))}
					</div>
				</div>
				<div className="flex items-center justify-center">
					<Image
						src={image}
						alt={`${image} description`}
						width={1000}
						height={1000}
						className="object-cover size-auto aspect-auto"
					/>
				</div>
			</div>
		</div>
	);
};
