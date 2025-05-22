import { Theme } from "@/components/shared/Theme";
import { IUser } from "@/lib/database/models/user.model";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export const AppNavbar = ({ user }: { user: IUser }) => {
	return (
		<div className="hidden h-16 border-b lg:flex items-center justify-center w-[calc(100vw-16rem)] fixed top-0 left-[16rem] z-50 bg-white dark:bg-black">
			<div className="container flex items-center justify-between">
				<h2 className="text-xl uppercase font-semibold">New Product</h2>
				<div className="flex items-center justify-end gap-4">
					<Theme />
					<ProfileDropdown user={user} />
				</div>
			</div>
		</div>
	);
};
