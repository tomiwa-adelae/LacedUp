import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { shoeSizes } from "@/constants";
import { Label } from "../ui/label";

interface SelectSizesProps {
	selectedSize: string;
	setSelectedSize: (val: string) => void;
}

export const SelectSizes = ({
	selectedSize,
	setSelectedSize,
}: SelectSizesProps) => {
	return (
		<div>
			<Label className="mb-3">Select size</Label>
			<Select value={selectedSize} onValueChange={setSelectedSize}>
				<SelectTrigger className="w-full">
					<SelectValue className="" placeholder="Select a size" />
				</SelectTrigger>
				<SelectContent>
					{shoeSizes.map((size, index) => (
						<SelectItem key={index} value={size}>
							{size}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
