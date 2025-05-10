"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { IAvailableColor } from "@/lib/database/models/product.model";

interface ColorSelectorProps {
	availableColors: any;
	selectedColor: any;
	setSelectedColor: (color: any) => void;
}

export const ColorSelector = ({
	availableColors,
	selectedColor,
	setSelectedColor,
}: ColorSelectorProps) => {
	const handleColorSelect = (color: IAvailableColor) => {
		setSelectedColor(color);
	};

	return (
		<div>
			<Label className="mb-3">Select color</Label>
			<div className="flex flex-wrap gap-3">
				{availableColors.map((color: any) => (
					<Button
						key={color.colorCode}
						onClick={() => handleColorSelect(color)}
						className={`relative rounded-full overflow-hidden transition-all duration-200 ${
							selectedColor.colorCode === color.colorCode
								? "ring-2 ring-primary ring-offset-1"
								: "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
						}`}
						aria-label={`Select ${color.name} color`}
						title={color.name}
						size={"icon"}
						variant={"outline"}
					>
						<div
							className="absolute inset-0"
							style={{ backgroundColor: color.colorCode }}
						/>
					</Button>
				))}
			</div>
		</div>
	);
};
