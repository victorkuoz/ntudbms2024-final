"use client";
import React from "react";
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

const columns = [
    "Title",
    "Similarity",
    "Preview",
    "Download",
    "Category",
    "More"
]

export interface ResultProps {
    items: ResultItem[]
}

export default function ResultTable(results: ResultProps) {
	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader>
				{columns.map((column) => (
					<TableColumn key={`column-${column}`}>{column}</TableColumn>
				))}
			</TableHeader>
			<TableBody>
				{results.items.map((row) => (
					<TableRow key={`row-${row.id}`}>
						<TableCell>{row.title}</TableCell>
						<TableCell>{row.similarity}</TableCell>
						<TableCell>
							<DownloadButton url={row.url}></DownloadButton>
						</TableCell>
						<TableCell>
							<DownloadButton url={row.url}></DownloadButton>
						</TableCell>
						<TableCell>
							<DownloadButton url={row.url}></DownloadButton>
						</TableCell>
						<TableCell>
							<DownloadButton url={row.url}></DownloadButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
