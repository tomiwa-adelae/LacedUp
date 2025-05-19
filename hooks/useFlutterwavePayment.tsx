import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export const useFlutterwavePayment = (config: any) => {
	const handleFlutterPayment = useFlutterwave(config);

	return {
		pay: (callback: (response: any) => void) => {
			handleFlutterPayment({
				callback: (response) => {
					callback(response);
					closePaymentModal(); // Close the modal after payment
				},
				onClose: () => {
					// You can handle modal close here
				},
			});
		},
	};
};
