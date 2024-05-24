"use client"
import { Select, SelectItem, Chip } from "@nextui-org/react";

const categories = [{ name: "123" }, { name: "456" }, { name: "789" }];

export default function SearchBar() {
	return (
		<Select
			items={categories}
			aria-label="Select"
			variant="bordered"
			isMultiline={true}
			selectionMode="multiple"
			placeholder="Select categories"
			labelPlacement="inside"
			classNames={{
				base: "max-w-xs",
				trigger: "min-h-12 py-2",
			}}
			renderValue={(items) => {
				return (
					<div className="flex flex-wrap gap-2">
						{items.map((item, i) => (
							<Chip key={`item-key-${i}`} color="secondary">{item.textValue}</Chip>
						))}
					</div>
				);
			}}>
			{categories.map((category) => (
				<SelectItem
					key={`category-key-${category.name}`}
					textValue={category.name}>
					<div className="flex gap-2 items-center">
						<div className="flex flex-col">
							<span className="text-small">{category.name}</span>
						</div>
					</div>
				</SelectItem>
			))}
		</Select>
	);
}
