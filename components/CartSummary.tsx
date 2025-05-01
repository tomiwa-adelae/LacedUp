import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Props {
	cta?: { slug: string; label: string };
}

export const CartSummary = ({
	cta = { slug: "/", label: "Check out" },
}: Props) => {
	return (
		<div className="sticky top-21 lg:block p-8 pb-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:bg-black dark:border col-span-1">
			<div className="flex items-center justify-between gap-8 mb-4">
				<h2 className="text-xl md:text-2xl uppercase font-semibold">
					Order summary
				</h2>
			</div>
			<div className="font-medium text-sm lg:text-base text-black dark:text-white">
				<Separator />
				<div className="flex items-center justify-between py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Subtotal
					</p>
					<p>₦14,900</p>
				</div>
				<Separator />{" "}
				<div className="flex items-center justify-between py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Shipping
					</p>
					<p>₦1,900</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between  py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Total
					</p>
					<p>₦14,900</p>
				</div>
				<Separator />
			</div>
			<Button size="lg" className="w-full mt-4">
				{cta.label}
			</Button>
		</div>
	);
};
