import Link from "next/link";
import { Button } from "./ui/button";
import { ListFilter } from "lucide-react";
import { Separator } from "./ui/separator";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ICategory } from "@/lib/database/models/category.model";

export const AllCategoryBox = ({ categories }: { categories: ICategory[] }) => {
	return (
		<>
			<div className="sticky top-21 hidden lg:block p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:bg-black dark:border">
				<h2 className="text-xl md:text-2xl uppercase font-semibold mb-4">
					All categories
				</h2>
				<Separator />
				<div className="space-y-2 mt-4">
					{categories.map(({ name, _id }) => (
						<Link
							key={_id}
							href={`/category/${_id}?name=${name}`}
							className="text-sm uppercase font-medium block hover:underline hover:text-primary transition-all"
						>
							<h4>{name}</h4>
						</Link>
					))}
				</div>
			</div>
			<Dialog>
				<DialogTrigger className="w-full">
					<Button
						size={"md"}
						className="w-full lg:hidden"
						variant="outline"
					>
						All categories <ListFilter />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<h2 className="text-xl md:text-2xl uppercase font-semibold">
						All categories
					</h2>
					<Separator />
					<div className="space-y-4 mb-4">
						{categories.map(({ name, _id }) => (
							<Link
								key={_id}
								href={`/category/${_id}?name=${name}`}
								className="text-sm uppercase font-medium block hover:underline hover:text-primary transition-all"
							>
								<h4>{name}</h4>
							</Link>
						))}
					</div>
					<DialogFooter>
						<DialogClose>
							<Button
								className="w-full md:w-auto"
								variant={"outline"}
								size={"md"}
							>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
