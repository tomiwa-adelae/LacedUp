import {
	ChartSpline,
	Facebook,
	Footprints,
	Instagram,
	LayoutDashboard,
	MoonStar,
	Settings,
	ShoppingCart,
	Sun,
	Twitter,
	Users,
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

export const shopByCategories = [
	{
		image: "/assets/images/men-shoe.jpg",
		category: "Men's shoes",
	},
	{
		image: "/assets/images/women-shoe.jpg",
		category: "Women's shoes",
	},
	{
		image: "/assets/images/kids-shoe.jpg",
		category: "Kid's shoes",
	},
	{
		image: "/assets/images/sneakers.jpg",
		category: "Sneakers",
	},
	{
		image: "/assets/images/loafers.jpg",
		category: "Loafers",
	},
	{
		image: "/assets/images/boots.jpg",
		category: "Boots",
	},
	{
		image: "/assets/images/sandals.jpg",
		category: "Sandals",
	},
	{
		image: "/assets/images/slippers.jpg",
		category: "Slippers",
	},
];

export const shoeSizes = [
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
];

export const nigerianStates = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
	"FCT (Abuja)",
] as const;

export const sidebarLinks = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Orders",
		href: "/orders",
		icon: ShoppingCart,
	},
	{
		label: "Products",
		href: "/products",
		icon: Footprints,
	},
	{
		label: "Customers",
		href: "/customers",
		icon: Users,
	},
	{
		label: "Analytics",
		href: "/analytics",
		icon: ChartSpline,
	},
];

export const suggestedTags = [
	"Running",
	"Casual",
	"Formal",
	"Sports",
	"Kids",
	"Waterproof",
	"Leather",
	"Canvas",
	"Summer",
	"Winter",
	"Sale",
	"New Arrival",
	"Limited Edition",
	"Sustainable",
];

export const DEFAULT_PRODUCT_IMAGE = "/assets/icons/shoe.svg";
export const DEFAULT_LIMIT = 2;
export const DEFAULT_NEW_LIMITS = 10;
