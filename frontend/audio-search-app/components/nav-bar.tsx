"use client"
import React from "react";
import {
	Navbar,
	NavbarContent,
    NavbarBrand,
	NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
	return (
		<Navbar position="static">
			<NavbarBrand>DBMS Final</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem isActive={pathname == "/"}>
					<Link color="foreground" href="/">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname == "/result"}>
					<Link href="/result" aria-current="page">
						Result
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<h1>Group 6</h1>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
