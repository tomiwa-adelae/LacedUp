import { CartProgress } from "@/components/CartProgress";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<CartProgress />
			{children}
		</div>
	);
};

export default layout;
