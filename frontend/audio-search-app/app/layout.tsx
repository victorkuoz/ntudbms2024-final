import "./globals.css";
import { Inter } from "next/font/google";
import { HotToaster } from "../components/hot-toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://audio-search.app"),
	title: "Frontend app for audio searching application",
	description: "A Next.js frontend app for dbms final",
};

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.variable}>
					{children}
					<HotToaster />
			</body>
		</html>
	);
}
