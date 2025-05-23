import { ShippingForm } from "@/components/forms/ShippingForm";

interface Props {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	state: string;
	city: string;
	address: string;
	postalCode: string;
	shippingDetails: any;
}

export const ShippingInformation = ({
	userId,
	firstName,
	lastName,
	email,
	phoneNumber,
	state,
	city,
	address,
	postalCode,
	shippingDetails,
}: Props) => {
	return (
		<div className="md:p-8 md:rounded-lg md:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:md:border dark:bg-black dark:text-white w-full">
			<h2 className="text-xl md:text-2xl uppercase font-semibold mb-4">
				Shipping Information
			</h2>
			<ShippingForm
				userId={userId}
				firstName={firstName}
				lastName={lastName}
				email={email}
				phoneNumber={phoneNumber}
				city={city}
				state={state}
				address={address}
				postalCode={postalCode}
				shippingDetails={shippingDetails}
			/>
		</div>
	);
};
