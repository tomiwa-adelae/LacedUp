import { emailAddress, WEBSITE_URL } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";

interface Props {
	name: string;
	email: string;
	orderId: string;
	items: any;
	totalPrice: string;
	address: string;
}

export const OrderConfirmationEmail = ({
	name,
	email,
	orderId,
	items,
	totalPrice,
	address,
}: Props) => `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Order Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Thank you for your order, ${email}!</h2>
      <p>We're excited to let you know that your order <strong>#${orderId}</strong> has been received.</p>

      <h3>Order Summary</h3>
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

      <p><strong>Total:</strong> ₦${formatMoneyInput(totalPrice)}</p>

      <p>Your order will be processed and shipped to:</p>
      <p>${address}</p>

      <p>If you have any questions, feel free to contact us at <a href="mailto:${emailAddress}">support@example.com</a>.</p>

      <p>Thank you for shopping with us!</p>
      <hr />
      <p style="font-size: 0.9em; color: #888;">This is an automated message. Please do not reply.</p>
    </div>
  </body>
</html>
`;
