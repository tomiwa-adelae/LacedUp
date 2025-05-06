import Ratings from "@/components/shared/Ratings";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Props {
	ratings?: boolean;
}

export const ShoeCard = ({ ratings }: Props) => {
	return (
		<Link href="/shoes/12345" className="group">
			<Image
				src={"/assets/images/sneakers.jpg"}
				alt={"Shoes"}
				width={1000}
				height={1000}
				className="aspect-square w-full h-[270px] lg:h-[320px] lg:w-[400px] rounded-lg object-cover"
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
				</div>
				<div className="flex items-center justify-between gap-8 my-2">
					<p className="text-lg font-medium">₦14,900</p>
					<p className="text-base text-muted-foreground font-medium">
						Sold: <span className="font-semibold">463</span>
					</p>
				</div>
				{ratings && <Ratings />}
			</div>
		</Link>
	);
};
