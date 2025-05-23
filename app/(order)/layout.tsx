import Footer from "@/components/shared/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { Header } from "@/components/shared/Header";
import { getUserInfo } from "@/lib/actions/user.actions";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);
	return (
		<div>
			<Header user={user?.user} />
			<div className="flex-1 pt-20">{children}</div>
			<Footer />
		</div>
	);
}
