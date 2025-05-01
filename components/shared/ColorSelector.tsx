"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const ColorSelector = () => {
	// Available color options for the shoe
	const colorOptions = [
		{
			id: 1,
			name: "Black",
			hex: "#000000",
		},
		{
			id: 2,
			name: "White",
			hex: "#FFFFFF",
		},
		{
			id: 3,
			name: "Red",
			hex: "#D32F2F",
		},
		{
			id: 4,
			name: "Blue",
			hex: "#1976D2",
		},
		{
			id: 5,
			name: "Green",
			hex: "#388E3C",
		},
	];

	// State for selected color
	const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

	// State for main product image

	// Handle color selection
	const handleColorSelect = (color: any) => {
		setSelectedColor(color);
	};
	return (
		<div>
			<Label className="mb-3">Select color</Label>
			<div className="flex flex-wrap gap-3">
				{colorOptions.map((color) => (
					<Button
						key={color.id}
						onClick={() => handleColorSelect(color)}
						className={`relative rounded-full overflow-hidden transition-all duration-200 ${
							selectedColor.id === color.id
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
							style={{ backgroundColor: color.hex }}
						/>
					</Button>
				))}
			</div>
		</div>
	);
};
