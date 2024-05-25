import { Button } from "@nextui-org/react";
import Image from "next/image";
import { moreAudioQuery } from "@/lib/route";
import { ResultItem } from "@/lib/definitions";

export interface MoreProps {
	filename: string;
	setResult: (filename: string) => void;
}

export default function MoreButton({ filename, setResult }: MoreProps) {
	return (
		<Button
			isIconOnly
			color="default"
			aria-label="More"
			onClick={() => setResult(filename)}>
			<Image
				src="/more-icon.png"
				alt="More Icon"
				width={20}
				height={20}
			/>
		</Button>
	);
}
