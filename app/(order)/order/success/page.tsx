import { Showcase } from "@/components/shared/Showcase";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div>
			<Showcase
				title={
					<>
						Successfully{" "}
						<span className="text-primary">Ordered!</span>
					</>
				}
				description="Thank you for your order, you should receive an email confirmation very soon"
				cta={[{ slug: "/", label: "Back to shop" }]}
				image={"/assets/images/showcase-img.png"}
			/>
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
