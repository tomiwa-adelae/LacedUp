import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Header } from "./components/Header";
import { AppNavbar } from "./components/AppNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<Sidebar user={user?.user} />
			<div className="lg:ml-[16rem]">
				{/* <AppNavbar user={user?.user} /> */}
				<div className="lg:pt-16">
					{/* <Header user={user?.user} /> */}
					<div className="min-h-screen pt-20 lg:pt-4 flex items-center justify-center flex-col">
						<div className="flex-1 container py-4 lg:py-0">
							{children}
						</div>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
