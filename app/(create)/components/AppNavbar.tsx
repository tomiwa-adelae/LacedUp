import { Theme } from "@/components/shared/Theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import Image from "next/image";

export const AppNavbar = () => {
	return (
		<div className="hidden h-16 border-b lg:flex items-center justify-center w-[calc(100vw-16rem)] fixed top-0 left-[16rem] z-50 bg-white dark:bg-black">
			<div className="container flex items-center justify-between">
				<h2 className="text-xl uppercase font-semibold">New Product</h2>
				<div className="flex items-center justify-end gap-4">
					<Theme />
					<Button size="md" variant={"outline"}>
						Discard
					</Button>
					<Button size="md">Create product</Button>
				</div>
			</div>
		</div>
	);
};
