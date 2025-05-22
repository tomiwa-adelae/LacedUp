"use client";
import { X, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { useState, useRef, KeyboardEvent } from "react";

export interface Tag {
	name: string;
	_id?: string;
}

interface TagsManagementProps {
	initialTags?: Tag[];
	onChange?: (tags: Tag[]) => void;
}

export default function TagsManagement({
	initialTags = [],
	onChange = () => {},
}: TagsManagementProps) {
	const [tags, setTags] = useState<Tag[]>(initialTags);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef(null);

	const handleAddTag = () => {
		const trimmedValue = inputValue.trim();

		if (!trimmedValue) {
			return;
		}

		if (tags.some((tag) => tag.name === trimmedValue)) {
			setError("This tag already exists");
			return;
		}
		// Add new tag object with name property
		const newTag: Tag = { name: trimmedValue };
		const newTags = [...tags, newTag];
		setTags(newTags);
		onChange(newTags);
		setInputValue("");
		setError("");
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		} else if (e.key === "," || e.key === ";") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const removeTag = (tagToRemove: Tag) => {
		const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);
		setTags(newTags);
		onChange(newTags);
	};

	const focusInput = () => {
		// @ts-ignore
		inputRef.current?.focus();
	};

	return (
		<div>
			<FormLabel className="mb-4 block">Tags</FormLabel>
			<div className="flex flex-col space-y-4">
				<div className="flex">
					<div className="flex-1">
						<Input
							ref={inputRef}
							placeholder="Add a tag..."
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
								if (error) setError("");
							}}
							onKeyDown={handleKeyDown}
							className={error ? "border-red-500" : ""}
						/>
						{error && (
							<p className="text-red-500 text-sm mt-1">{error}</p>
						)}
					</div>
					<Button
						onClick={handleAddTag}
						type="button"
						variant={"outline"}
						size={"sm"}
						className="rounded-md h-12"
					>
						Add
					</Button>
				</div>

				<div
					className="flex flex-wrap gap-2 min-h-10"
					onClick={focusInput}
				>
					{tags.length === 0 ? (
						<p className="text-gray-400 text-sm">
							No tags added yet. Click to add tags.
						</p>
					) : (
						tags.map((tag, index) => (
							<Badge
								key={index}
								variant="secondary"
								className="py-1 px-3"
							>
								<TagIcon className="w-3 h-3" />
								{tag.name}
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 hover:bg-transparent"
									onClick={(e) => {
										e.stopPropagation();
										removeTag(tag);
									}}
								>
									<X className="h-3 w-3" />
									<span className="sr-only">
										Remove {tag.name} tag
									</span>
								</Button>
							</Badge>
						))
					)}
				</div>
			</div>
		</div>
	);
}
