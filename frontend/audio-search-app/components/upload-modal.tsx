"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/react";
import { audioQuery } from "@/lib/route";
import { useResultContext } from "@/app/result-provider";
import { useRouter } from "next/navigation";

export default function UploadModal() {
	const [fileUrl, setFileUrl] = useState<string>();
	const [file, setFile] = useState<File | null>(null);
	const [fileEnter, setFileEnter] = useState(false);
    const {resultHandler, isLoaded, setIsLoaded} = useResultContext();
    const router = useRouter();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const fileItem = event.target.files?.[0] || null;
		setFile(fileItem);

		if (fileItem) {
			const preview = URL.createObjectURL(fileItem);
			setFileUrl(preview);
		} else {
			setFileUrl("");
		}
	};

	const drophandler = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		setFileEnter(false);
		if (e.dataTransfer.items) {
			const item = e.dataTransfer.items[0];
			if (item.kind === "file") {
				const fileItem = item.getAsFile();
				setFile(fileItem);
				if (fileItem) {
					let preview = URL.createObjectURL(fileItem);
					setFileUrl(preview);
				}
				console.log(`File name = ${fileItem?.name}`);
			} else {
				console.log("Not a file!!");
			}
		}
	};
	const searchHandler = async () => {
		if (file) {
            setIsLoaded(true)
            const res = await audioQuery(file);
            setIsLoaded(false)
            resultHandler(res);
            router.push("/result");
		} else {
			console.log("file is null");
		}
	};

	return (
		<div className="flex-col place-items-center w-full h-full flex-wrap gap-4">
			{!fileUrl ? (
				<div
					onDragOver={(e) => {
						e.preventDefault();
						setFileEnter(true);
					}}
					onDragLeave={(e) => {
						setFileEnter(false);
					}}
					onDragEnd={(e) => {
						e.preventDefault();
						setFileEnter(false);
					}}
					onDrop={(e) => drophandler(e)}
					className={`${
						fileEnter ? "border-4" : "border-2"
					} mx-auto  bg-white flex flex-col w-full max-w-xs h-full border-dashed items-center justify-center`}>
					<label
						htmlFor="file"
						className="h-full flex flex-col justify-center text-center">
						Click to upload or drag and drop
					</label>
					<input
						id="file"
						type="file"
						className="hidden"
						onChange={(e) => handleFileChange(e)}
					/>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<object
						className="rounded-md w-full max-w-xs h-72"
						data={fileUrl}
						type="image/png" //need to be updated based on type of file
					/>
					<Button
						color="primary"
						className="w-fit"
						onClick={() => searchHandler()}
						isLoading={isLoaded}>
						Search
					</Button>
					<Button
						color="danger"
						className="w-fit"
						onClick={() => setFileUrl("")}>
						Clear
					</Button>
				</div>
			)}
		</div>
	);
}
