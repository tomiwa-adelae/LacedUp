"use client";

import { SearchBar } from "@/components/forms/SearchBar";
import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white z-50 bg-white text-black md:hidden ">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo hide />
				<div className="flex-1 flex items-center justify-center gap-2 lg:gap-8">
					<SearchBar />

					{/* <Button className="hidden md:flex" asChild size={"md"}>
						<Link href="/contact">Contact us</Link>
					</Button> */}
					<SidebarTrigger />
					<div className="md:hidden">{/* <MobileNavbar /> */}</div>
				</div>
			</div>
		</header>
	);
};
