import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Ratings from "./Ratings";

interface Props {
	ratings?: boolean;
}

export const ShoeCard = ({ ratings }: Props) => {
	return (
		<div className="group">
			<Image
				src={"/assets/images/sneakers.jpg"}
				alt={"Shoes"}
				width={1000}
				height={1000}
				className="aspect-square w-[250px] h-[270px] lg:h-[320px] lg:w-[400px] rounded-lg object-cover"
			/>
			<div className="mt-4 pb-8">
				<Link
					href="/shoes/12345"
					className="text-lg font-medium mb-1 group-hover:text-primary transition-all"
				>
					Nike Cosmic Unity
				</Link>
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">Men's Shoe</p>
					<p className="text-sm text-muted-foreground">3 colors</p>
				</div>
				<div className="flex items-center justify-between gap-8 my-2">
					<p className="text-lg font-medium">₦14,900</p>
					<Button
						className="text-xs hover:text-primary hover:underline"
						variant={"ghost"}
						asChild
						size="sm"
					>
						<Link href="">Add to cart</Link>
					</Button>
				</div>
				{ratings && <Ratings />}
			</div>
		</div>
	);
};
