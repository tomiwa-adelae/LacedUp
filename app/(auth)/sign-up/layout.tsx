import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid lg:grid-cols-2 h-screen overflow-hidden">
			<div className="container flex flex-col py-8">{children}</div>
			<Image
				src={"/assets/images/auth-img-white.jpg"}
				alt="A shoe"
				width={1000}
				height={1000}
				className="dark:hidden size-full aspect-auto object-cover"
			/>
			<Image
				src={"/assets/images/auth-img-black.jpg"}
				alt="A shoe"
				width={1000}
				height={1000}
				className="hidden dark:block size-full aspect-auto object-cover"
			/>
		</div>
	);
};

export default layout;
