"use client";
import { useState } from "react";

export default function UploadModal() {
	const [file, setFile] = useState<string>();
	const [fileEnter, setFileEnter] = useState(false);
	const drophandler = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		setFileEnter(false);
		if (e.dataTransfer.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === "file") {
					const file = item.getAsFile();
					if (file) {
						let blobUrl = URL.createObjectURL(file);
						setFile(blobUrl);
                        console.log(`set file: ${blobUrl}`);
					}
					console.log(`items file[${i}].name = ${file?.name}`);
				}
			});
		} else {
			[...e.dataTransfer.files].forEach((file, i) => {
				console.log(`… file[${i}].name = ${file.name}`);
			});
		}
	};

	return (
		<div className="flex-col place-items-center w-full h-full flex-wrap gap-4">
			{!file ? (
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
						onChange={(e) => {
							console.log(e.target.files);
							let files = e.target.files;
							if (files && files[0]) {
								let blobUrl = URL.createObjectURL(files[0]);
								setFile(blobUrl);
							}
						}}
					/>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<object
						className="rounded-md w-full max-w-xs h-72"
						data={file}
						type="image/png" //need to be updated based on type of file
					/>
					<button
						onClick={() => setFile("")}
						className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded">
						Clear
					</button>
				</div>
			)}
		</div>
	);
}
