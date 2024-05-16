"use client";
import { searchPokedex } from "@/app/actions";
import { Search } from "@/components/search";
import { Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import Provider from "@/app/provider";
import UploadModal from "@/components/upload-modal";

export const dynamic = "force-dynamic";

export default function Home() {
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
								Try .
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-4">
						<Tabs
							key={"secondary"}
							color={"secondary"}
							aria-label="Options"
							radius="full">
							<Tab key="class" title="Class">
								<Card>
									<CardBody>
										<div className="divide-y divide-gray-900/5">
											<p>AAA</p>
											<Search
												searchPokedex={searchPokedex}
											/>
										</div>
									</CardBody>
								</Card>{" "}
							</Tab>
							<Tab key="music" title="Music">
								<Card>
									<CardBody>
										<div className="divide-y divide-gray-900/5">
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