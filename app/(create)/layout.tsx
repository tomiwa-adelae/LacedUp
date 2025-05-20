import { currentUser } from "@clerk/nextjs/server";
import Footer from "../(admin)/components/Footer";
import Sidebar from "../(admin)/components/Sidebar";
import { AppNavbar } from "./components/AppNavbar";
import { Header } from "./components/Header";
import { getUserInfo } from "@/lib/actions/user.actions";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<Sidebar user={user?.user} />
			<div className="lg:ml-[16rem]">
				<AppNavbar />
				<div className="lg:pt-16">
					<Header user={user?.user} />
					<div className="min-h-screen pt-20 lg:pt-0">
						<div className="">
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
