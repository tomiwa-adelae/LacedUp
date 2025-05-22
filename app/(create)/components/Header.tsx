"use client";

import Logo from "@/components/shared/Logo";
import { Theme } from "@/components/shared/Theme";
import { IUser } from "@/lib/database/models/user.model";
import { MobileNavbar } from "@/app/(admin)/components/MobileNavbar";

export const Header = ({ user }: { user: IUser }) => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white z-50  text-black lg:hidden bg-white border-b">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo
					title="New product"
					slug={"/products"}
					fontSize="text-xl"
				/>
				<div className="flex-1 flex items-center justify-end gap-4">
					<Theme />
					<div className="lg:hidden">
						<MobileNavbar user={user} />
					</div>
				</div>
			</div>
		</header>
	);
};
