import { Button } from "@nextui-org/react";
import Image from "next/image";
import { fileQuery } from "@/lib/route";

export interface DownloadProps {
	filename: string;
}

export default function DownloadButton({ filename }: DownloadProps) {
    const downloadHandler = async () => {
        fileQuery(filename)
	};
	return (
		<Button
			isIconOnly
			color="default"
			aria-label="Download"
			onClick={downloadHandler}>
			<Image
				src="/download-icon.png"
				alt="Download Icon"
				width={20}
				height={20}
			/>
		</Button>
	);
}
