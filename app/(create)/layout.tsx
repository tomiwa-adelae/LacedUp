import Sidebar from "../(admin)/components/Sidebar";
import { AppNavbar } from "./components/AppNavbar";
import { Header } from "./components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Sidebar />
			<div className="lg:ml-[16rem]">
				<AppNavbar />
				<div className="lg:pt-16">
					<Header />
					<div className="min-h-screen pt-20 lg:pt-0">
						<div className="">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
