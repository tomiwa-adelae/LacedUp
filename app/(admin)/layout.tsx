import { Header } from "./components/Header";
import { AppNavbar } from "./components/AppNavbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	console.log(user);

	return (
		<div>
			<Sidebar user={user?.user} />
			<div className="lg:ml-[16rem]">
				<AppNavbar />
				<div className="lg:pt-16">
					<Header />
					<div className="min-h-screen pt-20 lg:pt-4">
						<div className="container py-4 lg:py-0">{children}</div>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
