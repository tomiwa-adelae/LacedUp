import { SidebarContent } from "./SidebarContent";

const Sidebar = () => {
	return (
		<div className="hidden bg-white dark:bg-black fixed left-0 top-0 h-screen lg:flex w-[16rem] border-r flex-col z-50 py-4">
			<SidebarContent />
		</div>
	);
};

export default Sidebar;
