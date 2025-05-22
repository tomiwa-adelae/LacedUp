import { Header } from "./components/Header";
import Footer from "../(admin)/components/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { AppNavbar } from "./components/AppNavbar";
import Sidebar from "../(admin)/components/Sidebar";
import { getUserInfo } from "@/lib/actions/user.actions";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<Sidebar user={user?.user} />
			<div className="lg:ml-[16rem]">
				<AppNavbar user={user?.user} />
				<div className="lg:pt-16">
					<Header user={user?.user} />
					<div className="min-h-screen pt-20 lg:pt-4 flex items-center justify-center flex-col">
						<div className="flex-1">
							{children}
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
