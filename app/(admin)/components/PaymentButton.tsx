"use client";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGO } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useFlutterwavePayment } from "@/hooks/useFlutterwavePayment";
import { updateOrder } from "@/lib/actions/order.actions";

interface Props {
	name: string;
	email: string;
	phoneNumber: string;
	amount: string;
	title: string;
	description: string;
	userId: string;
	orderId: string;
}

export const PaymentButton = ({
	amount,
	phoneNumber,
	email,
	name,
	title,
	description,
	userId,
	orderId,
}: Props) => {
	const config = {
		public_key: process.env.NEXT_PUBLIC_FW_PUBLIC_KEY, // Make sure it's NEXT_PUBLIC
		tx_ref: Date.now().toString(),
		amount,
		currency: "NGN",
		payment_options:
			"card, account, banktransfer, mpesa, mobilemoneyfranco, mobilemoneyuganda, mobilemoneyrwanda, mobilemoneyzambia, barter, nqr, ussd, credit, mobilemoneyghana",
		customer: {
			email,
			name,
			phone_number: phoneNumber, // Key should be `phone_number`
		},
		customizations: {
			title,
			description,
			logo: DEFAULT_LOGO,
		},
	};

	const { pay } = useFlutterwavePayment(config);

	const makePayment = async () => {
		try {
			if (!config.public_key) {
				throw new Error("Flutterwave public key is not defined.");
			}
			console.log("Config:", config);

			pay(async (response) => {
				console.log("Payment response:", response);
				const details = {
					id: response.transaction_id,
					status: response.status,
					update_time: response.created_at,
					email_address: response.customer.email,
				};

				const res = await updateOrder({ details, userId, orderId });
				console.log(res);
			});
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: error.message || "Something went wrong!",
			});
		}
	};

	return (
		<Button onClick={makePayment} className="w-full mt-4" size="lg">
			Pay now
		</Button>
	);
};
