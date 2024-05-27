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
} from "@nextui-org/react";
import { Result, ResultItem } from "@/lib/definitions";
import DownloadButton from "./download-button";
import AudioButton from "./audio-button";
import { audioFetch } from "@/lib/route";
import MoreButton from "./more-button";
import { useResultContext } from "@/app/result-provider";

const columns = [
	"Title",
	"Similarity",
	"Preview",
	"Download",
	"Category",
	"More",
];



export default function ResultTable() {
	const { result } = useResultContext();

	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader>
				{columns.map((column) => (
					<TableColumn key={`column-${column}`}>{column}</TableColumn>
				))}
			</TableHeader>
			<TableBody>
				{result.map((row, i) => (
					<TableRow key={`row-${i}`}>
						<TableCell>{row.title}</TableCell>
						<TableCell>{row.similarity}</TableCell>
						<TableCell>
							<AudioButton filename={row.filename} />
						</TableCell>
						<TableCell>
							<DownloadButton filename={row.filename} />
						</TableCell>
						<TableCell>
							<DownloadButton filename={row.filename} />
						</TableCell>
						<TableCell>
							<MoreButton
								filename={row.filename}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
