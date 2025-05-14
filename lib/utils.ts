import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
	console.log(error);
};

export function removeCommas(value: any) {
	return value.replace(/,/g, "");
}

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if (
		event.key === "e" ||
		event.key === "E" ||
		event.key === "-" ||
		event.key === "+"
	) {
		event.preventDefault();
	}
};

// export const formatMoneyInput = (inputValue: any) => {
// 	let value = inputValue.replace(/[^0-9.]/g, "");
// 	let [whole, decimal] = value.split(".");
// 	whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// 	return decimal !== undefined ? `${whole}.${decimal}` : whole;
// };
export const formatMoneyInput = (inputValue: any) => {
	if (inputValue == null || isNaN(Number(inputValue))) return "0";

	let value = String(inputValue).replace(/[^0-9.]/g, "");
	let [whole, decimal] = value.split(".");
	whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

// await User.updateMany(
// 	{ isAdmin: { $exists: false } },
// 	{ $set: { isAdmin: false } }
// );

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}

export function removeKeysFromQuery({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key: any) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
}

export function formatDate(dateString: string | any): string {
	const date = new Date(dateString);

	// Get the day, month and year
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	// Function to get the ordinal suffix
	const getOrdinalSuffix = (num: number): string => {
		const suffixes = ["th", "st", "nd", "rd"];
		const modulo100 = num % 100;
		const modulo10 = num % 10;
		const suffix =
			modulo10 <= 3 && modulo10 > 0 && modulo100 !== 11
				? suffixes[modulo10]
				: suffixes[0];
		return `${num}${suffix}`;
	};

	// Format the date
	return `${month} ${getOrdinalSuffix(day)}, ${year}`;
}

export const formattedPaymentMethod: Record<string, string> = {
	bank_transfer: "Bank transfer",
	cash_on_delivery: "Cash on delivery",
	card: "Card",
};
