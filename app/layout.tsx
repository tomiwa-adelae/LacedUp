import "./globals.css";
import Head from "next/head";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Quality Shoes Online | LacedUp",
	description:
		"Discover premium sneakers, boots, heels, and sandals at unbeatable prices. Shop quality shoes for men, women, and kids in Nigeria. Fast delivery & secure payment.",
	keywords:
		"Buy shoes online Nigeria, affordable shoes Nigeria, men’s sneakers, women’s sandals, kids shoes Nigeria, shop shoes Lagos",
	openGraph: {
		images: "/assets/opengraph.jpg",
	},
	metadataBase: new URL("https://lacedup-six.vercel.app"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<Head>
					<meta property="og:image" content="/opengraph.jpg" />
					<meta property="og:image" content="/assets/opengraph.jpg" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, user-scalable=no"
					/>
					<meta
						data-n-head="ssr"
						data-hid="viewport"
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
					/>
					<meta name="robots" content="noindex, nofollow" />
				</Head>
				<body
					className={`${montserrat.className} antialiased min-h-screen flex flex-col justify-between dark:bg-black dark:text-white`}
				>
					<ThemeProvider>
						<CartProvider>
							{children}
							<Toaster />
						</CartProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
