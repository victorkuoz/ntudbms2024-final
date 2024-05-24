import { Button } from "@nextui-org/react";
import Image from "next/image";
import { downloadFile } from "@/lib/route";

export interface DownloadProps {
	url: string;
}

export default function DownloadButton({ url }: DownloadProps) {
	const downloadHandler = async () => {
		await downloadFile(url);
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
