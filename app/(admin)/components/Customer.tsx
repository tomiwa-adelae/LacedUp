import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export const Customer = () => {
	return (
		<div className="flex items-center justify-between gap-4 border-b pb-2">
			<div className="flex items-center justify-start gap-2">
				<Image
					src={"/assets/images/user.jpeg"}
					alt="Tomiw"
					width={1000}
					height={1000}
					className="rounded-full size-10 object-cover"
				/>
				<div>
					<p className="text-sm font-medium text-black dark:text-white">
						Tomiwa Adelae
					</p>
					<a
						href=""
						className="hover:text-primary hover:underline text-xs text-muted-foreground dark:text-gray-200"
					>
						tomiwa@gmail.com
					</a>
				</div>
			</div>
			<div className="flex items-center justify-end gap-2">
				<Button size={"icon"} variant={"outline"}>
					<Mail className="size-4" />
				</Button>
				<Button size={"icon"} variant={"outline"}>
					<Phone className="size-4" />
				</Button>
			</div>
		</div>
	);
};
