"use client";

import { SearchBar } from "@/components/forms/SearchBar";
import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";
import { MobileNavbar } from "./MobileNavbar";

export const Header = () => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white z-50 bg-white  text-black lg:hidden border-b">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo hide={true} />
				<div className="flex-1 flex items-center justify-center gap-2 lg:gap-8">
					<SearchBar />
					<Theme />
					<div className="lg:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};
