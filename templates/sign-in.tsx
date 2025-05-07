import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
	return (
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
						Login
					</h1>
					<p className="text-base text-muted-foreground dark:text-gray-200 mt-2">
						Choose from 10,000+ products across 440+ categories
					</p>
				</div>
			</ScrollArea>
		</div>
	);
};

export default page;
