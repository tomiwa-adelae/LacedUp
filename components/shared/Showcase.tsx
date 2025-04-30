import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export const Showcase = () => {
	return (
		<div className="dark:bg-black dark:text-white min-h-[70vh] flex items-center justify-center py-16">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col justify-center items-start">
					<h1 className="uppercase text-4xl lg:text-5xl font-semibold">
						Lace up &{" "}
						<span className="text-primary">Stand out.</span>
					</h1>
					<p className="text-base text-muted-foreground dark:text-gray-200 mt-4">
						Discover premium footwear for every occasion. From
						limited edition sneakers to timeless classics, find your
						perfect pair at LacedUp and elevate your stride.
					</p>
					<Button
						className="w-full md:w-auto mt-6"
						asChild
						size={"lg"}
					>
						<Link href="/new">Shop now</Link>
					</Button>
				</div>
				<div className="flex items-center justify-center">
					<Image
						src={"/assets/images/showcase-img.png"}
						alt="A pair of multicolored sneakers"
						width={1000}
						height={1000}
						className="object-cover w-auto h-auto aspect-auto"
					/>
				</div>
			</div>
		</div>
	);
};
