"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { adminUpdateOrderDetails } from "@/lib/actions/order.actions";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export const MarkAsPaidButton = ({
	userId,
	orderId,
}: {
	userId: string;
	orderId: string;
}) => {
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		try {
			setLoading(true);
			const details = {
				isPaid: true,
				paymentStatus: "paid",
			};
			const res = await adminUpdateOrderDetails({
				userId,
				orderId,
				details,
			});

			if (res?.status === 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			setLoading(false);
			toast({
				title: "Success!",
				description: res.message,
			});
		} catch (error) {
			setLoading(true);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			disabled={loading}
			onClick={handlePayment}
			className="w-full mt-4"
			size="lg"
		>
			{loading ? (
				<LoaderCircle className="animate-spin" />
			) : (
				"Mark as paid"
			)}
		</Button>
	);
};
