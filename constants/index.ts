import {
	Facebook,
	Instagram,
	MoonStar,
	Settings,
	Sun,
	Twitter,
} from "lucide-react";

export const navLinks = [
	{
		label: "New",
		slug: "/new",
	},
	{
		label: "Women",
		slug: "/women",
	},
	{
		label: "Men",
		slug: "/men",
	},
	{
		label: "Kids",
		slug: "/kids",
	},
];

export const socialLinks = [
	{
		name: "X",
		icon: Twitter,
		slug: "www.twitter.com",
	},
	{
		name: "Instagram",
		icon: Facebook,
		slug: "www.facebook.com",
	},
	{
		name: "Instagram",
		icon: Instagram,
		slug: "www.instagram.com",
	},
];

export const footerDetails = [
	{
		title: "About LacedUp",
		links: [
			{
				slug: "/about",
				label: "About",
			},
			{
				slug: "/careers",
				label: "Careers",
			},
			{
				slug: "/blogs",
				label: "Blogs",
			},
			{
				slug: "/partners",
				label: "Partners",
			},
		],
	},
	{
		title: "Customer Service",
		links: [
			{
				slug: "/faqs",
				label: "FAQS",
			},
			{
				slug: "/contact",
				label: "Contact info",
			},
			{
				slug: "/shipping-return-policy",
				label: "Shipping And Returns Policy",
			},
			{
				slug: "/privacy-policy",
				label: "Privacy Policy",
			},
		],
	},
	{
		title: "Explore LacedUp",
		links: [
			{
				slug: `/men`,
				label: "Men",
			},
			{
				slug: `/women`,
				label: "Women",
			},
			{
				slug: `/kids`,
				label: "Kids",
			},
			{
				slug: `/new`,
				label: "New",
			},
		],
	},
];

export const themes = [
	{
		value: "light",
		icon: Sun,
	},
	{
		value: "dark",
		icon: MoonStar,
	},
	{
		value: "system",
		icon: Settings,
	},
];
