import { IUser } from "@/lib/database/models/user.model";
import { SidebarContent } from "./SidebarContent";

const Sidebar = ({ user }: { user: IUser }) => {
	return (
		<div className="hidden bg-white dark:bg-black fixed left-0 top-0 h-screen lg:flex w-[16rem] border-r flex-col z-50 py-4">
			<SidebarContent user={user} />
		</div>
	);
};

export default Sidebar;
