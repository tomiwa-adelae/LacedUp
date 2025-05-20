import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { Theme } from "@/components/shared/Theme";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/database/models/user.model";
import { Bell } from "lucide-react";
import { SearchBar } from "@/components/forms/SearchBar";

export const AppNavbar = ({ user }: { user: IUser }) => {
	return (
		<div className="hidden h-16 border-b lg:flex items-center justify-center bg-white dark:bg-black w-[calc(100vw-16rem)] fixed top-0 left-[16rem] z-50">
			<div className="container flex items-center justify-between">
				<SearchBar />
				<div className="flex-1 w-full flex items-center justify-end gap-4">
					<Theme />
					<Button size={"icon"} variant={"outline"}>
						<Bell className="size-5" />
					</Button>
					<ProfileDropdown user={user} />
				</div>
			</div>
		</div>
	);
};
