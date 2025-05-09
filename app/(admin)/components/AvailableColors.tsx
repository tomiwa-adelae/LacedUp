import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const AvailableColors = ({ colorOptions }: any) => {
	return (
		<div>
			<Label className="mb-3">Available colors</Label>
			<div className="flex flex-wrap gap-3">
				{colorOptions.map(
					(color: {
						name: string;
						colorCode: string;
						_id: string;
					}) => (
						<Button
							key={color._id}
							className={`relative rounded-full overflow-hidden transition-all duration-200 `}
							aria-label={`${color.name} color`}
							title={color.name}
							size={"icon"}
							variant={"outline"}
						>
							<div
								className="absolute inset-0"
								style={{
									backgroundColor: color.colorCode,
								}}
							/>
						</Button>
					)
				)}
			</div>
		</div>
	);
};
