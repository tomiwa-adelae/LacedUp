export const InformationBox = ({ description }: { description: string }) => {
	return (
		<div className="py-4 bg-primary text-sm px-4 rounded-lg border-primary dark:border-primary border text-white font-medium">
			{description}
		</div>
	);
};
