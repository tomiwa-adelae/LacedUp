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
	// media: string[];
	price: string;
	// availableColors: string[];
	// tags?: string[];
	userId: string;
}
