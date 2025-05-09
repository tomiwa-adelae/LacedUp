import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { TagIcon } from "lucide-react";

export const ProductTags = ({ tags }: any) => {
	return (
		<div>
			<Label className="mb-3">Product tags</Label>
			<div className="flex flex-wrap gap-2 min-h-10">
				{tags.map((tag: { name: string; _id: string }) => (
					<Badge
						key={tag._id}
						variant="secondary"
						className="text-sm py-1 px-3"
					>
						<TagIcon className="w-3 h-3" />
						{tag.name}
					</Badge>
				))}
			</div>
		</div>
	);
};
