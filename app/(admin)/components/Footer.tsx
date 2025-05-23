const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="w-full bg-white text-black dark:bg-black dark:text-white mt-8 transition-all py-6 text-center font-medium uppercase text-xs">
			<p className="container">
				&copy; {year} LacedUp. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
