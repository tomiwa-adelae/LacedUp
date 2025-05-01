import { Theme } from "@/components/shared/Theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import Image from "next/image";

export const AppNavbar = () => {
	return (
		<div className="hidden h-16 border-b md:flex items-center justify-center w-full">
			<div className="container flex items-center justify-between">
				<Input
					className="rounded-full max-w-[400px] dark:border-white border-2 h-12"
					placeholder="Search for shoes..."
				/>
				<div className="flex-1 w-full flex items-center justify-end gap-4">
					<Theme />
					<Button size={"icon"} variant={"outline"}>
						<Bell className="size-5" />
					</Button>
					<Image
						src={"/assets/images/user.jpeg"}
						alt={"Tomiwa adelae"}
						width={1000}
						height={1000}
						className="rounded-full object-cover size-10"
					/>
				</div>
			</div>
		</div>
	);
};
