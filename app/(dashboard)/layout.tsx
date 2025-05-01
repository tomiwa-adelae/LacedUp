import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import AppHeader from "./components/AppHeader";
import { Header } from "./components/Header";
import { AppNavbar } from "./components/AppNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider defaultOpen={true}>
			<Sidebar>
				<SidebarHeader />
				<SidebarContent>
					<AppHeader />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
			<main className="relative">
				<Header />
				<div className="py-8 pt-20 md:pt-0 min-h-screen">
					<AppNavbar />
					<div>{children}</div>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default layout;
