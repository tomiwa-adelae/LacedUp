import { WEBSITE_URL } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";

interface Props {
	orderId: string;
	items: any;
	totalPrice: string;
	paymentId: string;
	name: string;
}

export const PaymentSuccess = ({
	orderId,
	items,
	totalPrice,
	paymentId,
	name,
}: Props) => `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Payment Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      
      <h2 style="color: #4CAF50;">Payment Successful!</h2>
      <p>Hi <strong>${name}</strong>,</p>

      <p>We're happy to inform you that your payment of <strong>₦${totalPrice}</strong> for order <strong>#${orderId}</strong> was successful via Flutterwave.</p>

      <h3 style="margin-top: 30px;">Order Summary</h3>
     <ul>
      ${items.map(
			({
				image,
				name,
				id,
				category,
				color,
				size,
				quantity,
				price,
			}: any) => (
				<div
					key={id}
					className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 md:flex items-center justify-between gap-4 dark:border"
				>
					<Image
						src={image}
						alt={`${name}'s picture`}
						width={1000}
						height={1000}
						className="object-cover aspect-square size-[80px] rounded-lg"
					/>
					<div className="flex-1">
						<h3>
							<a
								href={`${WEBSITE_URL}/shoes/${id}`}
								className="text-base font-medium mb-1 hover:text-primary transition-all"
							>
								{name}
							</a>
						</h3>
						<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
							<a href={`${WEBSITE_URL}/category/${category}`}>
								Category:{" "}
								<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary">
									{category}
								</span>
							</a>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Color:{" "}
								<span className="text-black dark:text-white">
									{color}
								</span>
							</p>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Size:{" "}
								<span className="text-black dark:text-white">
									{size}
								</span>
							</p>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Quantity:{" "}
								<span className="text-black dark:text-white">
									{quantity}
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col justify-center gap-1 items-center h-full">
						<h3 className="font-medium text-base">
							₦{formatMoneyInput(price)}
						</h3>
					</div>
				</div>
			)
		)}
      </ul>

      <p><strong>Total Paid:</strong> ₦${totalPrice}</p>

      <h4>Payment Reference:</h4>
      <p>${paymentId}</p>

      <h4>Next Steps:</h4>
      <ul>
        <li>Your order is being processed.</li>
        <li>You’ll receive a tracking update soon.</li>
        <li>If you have any questions, contact us anytime.</li>
      </ul>

      <p style="margin-top: 30px;">Thank you for choosing us! 💚</p>

      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #999;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  </body>
</html>
`;
