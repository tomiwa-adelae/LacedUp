declare interface CreateUserParams {
	clerkId: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	picture: string;
}

declare interface CreateNewProductParams {
	name: string;
	description: string;
	category: string;
	media: any;
	price: string;
	availableColors: any;
	tags?: any;
	userId: string;
	existingMedia?: any;
}

declare interface SearchParamsProps {
	searchParams?: any;
}

declare interface UpdateProductParams {
	productId: any;
	details: {
		name: string;
		description: string;
		category: string;
		media: any;
		price: string;
		availableColors: any;
		tags?: any;
		userId: string;
		existingMedia: any;
	};
}
