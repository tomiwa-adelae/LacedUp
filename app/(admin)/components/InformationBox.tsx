import { Check } from "lucide-react";

export const InformationBox = ({ description }: { description: string }) => {
	return (
		<div className="py-4 text-sm px-4 rounded-lg bg-green-100 border-green-400 border text-black font-medium">
			<div className="flex items-center justify-start gap-2">
				<Check />
				<div className="space-y-2">
					<h4 className="text-base font-semibold">Payment success</h4>
					<p className="text-sm">
						You have successfully made the payment
					</p>
				</div>
			</div>
		</div>
	);
};
