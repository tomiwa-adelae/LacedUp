import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
	title: "Create an account | LacedUp",
};

export default function Page() {
	return (
		<div>
			<div className="h-screen">
				<ScrollArea className="h-full">
					<header className="flex items-center justify-between gap-4">
						<Logo />
						<Theme />
					</header>
					<div className="flex-1 mt-10">
						<h1
							style={{ fontFamily: "ClashDisplay" }}
							className="font-semibold text-2xl"
						>
							Create an account
						</h1>
						<p className="text-base text-muted-foreground dark:text-gray-200 mt-2">
							Choose from 10,000+ shoes across 440+ categories
						</p>
					</div>
					<SignUp />
				</ScrollArea>
			</div>
		</div>
	);
}
