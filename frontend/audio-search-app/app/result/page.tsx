"use client";
import ResultTable from "@/components/result-table";
import Providers from "@/app/providers";
import { useState } from "react";
import { Result, ResultItem } from "@/lib/definitions";
import { moreAudioQuery } from "@/lib/route";

const items = [
	{
		title: "MP3-1",
		similarity: 0.44,
		filename: "test1.mp3",
	},
	{
		title: "MP3-2",
		similarity: 0.55,
		filename: "test2.mp3",
	},
	{
		title: "MP3-3",
		similarity: 0.64,
		filename: "test3.mp3",
	},
];
const items2 = [
	{
		title: "MP3-2",
		similarity: 0.55,
		filename: "test2.mp3",
	},
	{
		title: "MP3-3",
		similarity: 0.64,
		filename: "test3.mp3",
	},
];

export default function ResultPage() {
	return (
		<main className="relative flex min-h-80 flex-col items-center justify-center">
			<h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
				Title
			</h1>
			<div className="bg-white/30 p-6 lg:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-full">
				<div className="flex justify-between items-center mb-4">
					<div className="space-y-1">
						<h2 className="text-xl font-semibold">
							Search the sound, semantically
						</h2>
						<p className="text-sm text-gray-500 leading-5">
							These are your search result:
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-4">
					<ResultTable />
				</div>
			</div>
		</main>
	);
}
