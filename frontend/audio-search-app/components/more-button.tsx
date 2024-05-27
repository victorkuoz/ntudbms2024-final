import { Button } from "@nextui-org/react";
import Image from "next/image";
import { moreAudioQuery } from "@/lib/route";
import { ResultItem } from "@/lib/definitions";
import { useResultContext } from "@/app/result-provider";
export interface MoreProps {
	filename: string;
}

export default function MoreButton({ filename}: MoreProps) {
    const clickHandler = async (filename: string) => {
        const res = await moreAudioQuery(filename)
        resultHandler(res)
    }
    const {resultHandler} = useResultContext()
	return (
		<Button
			isIconOnly
			color="default"
			aria-label="More"
			onClick={() => clickHandler(filename)}>
			<Image
				src="/more-icon.png"
				alt="More Icon"
				width={20}
				height={20}
			/>
		</Button>
	);
}
