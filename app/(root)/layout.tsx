import { Header } from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<div className="flex-1 pt-20">{children}</div>
			<Footer />
		</div>
	);
}
