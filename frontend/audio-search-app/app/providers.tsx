"use client";

import { ResultItem } from "@/lib/definitions";
import { moreAudioQuery } from "@/lib/route";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResultProvider } from "./result-provider";


export default function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();


    return (
		<div className="max-h-20">
			<ResultProvider>
				<NextUIProvider navigate={router.push}>
					{children}
				</NextUIProvider>
			</ResultProvider>
		</div>
	);
}
