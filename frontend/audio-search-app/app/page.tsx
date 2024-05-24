"use client";
import { Search } from "@/components/search";
import {
	Tabs,
	Tab,
	Card,
	CardBody,
	CardHeader,
	Button,
	Divider,
} from "@nextui-org/react";
import Provider from "@/app/provider";
import UploadModal from "@/components/upload-modal";
import SearchBar from "@/components/search-bar";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<Provider>
			<main className="relative flex min-h-screen flex-col items-center justify-center">
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
								Try .
							</p>
						</div>
					</div>
					<div className="flex-col flex content-center items-center flex-wrap gap-4 h-full w-full">
						<Tabs
							key={"secondary"}
							color={"secondary"}
							aria-label="Options"
							radius="full"
							className="flex justify-center h-full w-full">
							<Tab
								key="class"
								title="Class"
								className="h-full w-full">
								<Card className="h-72 w-full">
									<CardBody>
										<div className="divide-y divide-gray-900/5 flex flex-col items-center">
											<h2 className="text-xl font-semibold">
												Search by categories
											</h2>
											<Divider />
											<SearchBar />
										</div>
									</CardBody>
									<div className="h-20 w-full flex justify-center items-center">
										<Button color="primary">Search</Button>
									</div>
								</Card>
							</Tab>
							<Tab
								key="music"
								title="Music"
								className="h-full w-full">
								<Card className="h-72 w-full">
									<CardBody>
										<div className="divide-y divide-gray-900/5 flex-col w-full h-full">
											<UploadModal />
										</div>
									</CardBody>
								</Card>
							</Tab>
						</Tabs>
					</div>
				</div>
			</main>
		</Provider>
	);
}
