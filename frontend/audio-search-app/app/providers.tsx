"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export default function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();
    
    return (
		<div className="max-h-20">
			<NextUIProvider navigate={router.push}>{children}</NextUIProvider>
		</div>
	);
}
