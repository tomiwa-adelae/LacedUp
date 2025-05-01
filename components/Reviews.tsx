import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Ratings from "./shared/Ratings";
import { Progress } from "./ui/progress";

export const Reviews = () => {
	return (
		<div className="dark:bg-black dark:text-white py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						Customer reviews
					</h2>
				</div>
				<div className="my-4">
					<Ratings />
				</div>
				<div className="grid gap-4 max-w-sm">
					<div className="flex items-center-safe justify-center gap-4">
						<p className="text-base">5 star</p>
						<Progress value={33} className="w-[60%] flex-1" />
						<p className="text-base">57%</p>
					</div>
					<div className="flex items-center-safe justify-center gap-4">
						<p className="text-base">5 star</p>
						<Progress value={33} className="w-[60%] flex-1" />
						<p className="text-base">57%</p>
					</div>
					<div className="flex items-center-safe justify-center gap-4">
						<p className="text-base">5 star</p>
						<Progress value={33} className="w-[60%] flex-1" />
						<p className="text-base">57%</p>
					</div>
					<div className="flex items-center-safe justify-center gap-4">
						<p className="text-base">5 star</p>
						<Progress value={33} className="w-[60%] flex-1" />
						<p className="text-base">57%</p>
					</div>
					<div className="flex items-center-safe justify-center gap-4">
						<p className="text-base">5 star</p>
						<Progress value={33} className="w-[60%] flex-1" />
						<p className="text-base">57%</p>
					</div>
				</div>
			</div>
		</div>
	);
};
