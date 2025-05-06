"use client";

import { MobileNavbar } from "@/app/(admin)/components/MobileNavbar";
import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";

export const Header = () => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white z-50  text-black lg:hidden bg-white border-b">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo hide={true} />
				<div className="flex-1 flex items-center justify-end gap-4">
					<Theme />
					<div className="lg:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};
