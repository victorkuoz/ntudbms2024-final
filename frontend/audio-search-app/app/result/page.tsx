import ResultTable from '@/components/result-table'
import Provider from "@/app/provider";

const items = [
	{
		id: 1,
		title: "MP3-1",
		similarity: 0.44,
		url: "AAAAA",
	},
	{
		id: 2,
		title: "MP3-2",
		similarity: 0.55,
		url: "ACCAA",
	},
	{
		id: 3,
		title: "MP3-3",
		similarity: 0.64,
		url: "BBB",
	}
];


export default function page() {
    return (
		<Provider>
			<main className="relative flex min-h-screen flex-col items-center justify-center">
				<h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
					Title
				</h1>
				<div className="bg-white/30 p-6 lg:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
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
						<ResultTable items={items} />
					</div>
				</div>
			</main>
		</Provider>
	);
}