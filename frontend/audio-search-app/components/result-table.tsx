"use client";
import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Skeleton,
    Spinner,
} from "@nextui-org/react";
import { Result, ResultItem } from "@/lib/definitions";
import DownloadButton from "./download-button";
import AudioButton from "./audio-button";
import { audioFetch } from "@/lib/route";
import MoreButton from "./more-button";
import { useResultContext } from "@/app/result-provider";

const NODATA = "Nothing found!";

const columns = ["Title", "Similarity", "Preview", "Download", "More"];

export default function ResultTable() {
	const { result, isLoaded } = useResultContext();

	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader className="w-full bg-green-300">
				{columns.map((column) => (
					<TableColumn key={`column-${column}`}>{column}</TableColumn>
				))}
			</TableHeader>
			{result.length !== 0 ? (
				<TableBody
					isLoading={isLoaded}
					loadingContent={<Spinner />}
					loadingState={isLoaded ? "loading" : "idle"}>
					{result.map((row, i) => (
						<TableRow key={`row-${i}`} data-middle={true}>
							<TableCell>{i + 1}</TableCell>
							<TableCell>{row.similarity.toFixed(4)}</TableCell>
							<TableCell>
								<AudioButton filename={row.filename} />
							</TableCell>
							<TableCell>
								<DownloadButton filename={row.filename} />
							</TableCell>
							<TableCell>
								<MoreButton filename={row.filename} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			) : (
				<TableBody
					isLoading={isLoaded}
					emptyContent={"No rows to display."}>
					{[]}
				</TableBody>
			)}
		</Table>
	);
}
