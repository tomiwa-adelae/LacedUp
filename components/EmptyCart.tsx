import { FolderOpen } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => {
	return (
		<div className="container shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-8 mt-4 dark:border flex items-center flex-col justify-center gap-4 text-center rounded-lg h-40">
			<FolderOpen className="size-10 lg:size-14 mx-auto" />
			<p className="text-sm md:text-base font-medium">
				Your cart is empty.{" "}
				<Link className="underline hover:text-primary" href="/">
					Start shopping
				</Link>
			</p>
		</div>
	);
};
