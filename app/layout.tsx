import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const font = Open_Sans({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Discord",
	description: "Chat app build with nextjs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider afterSignOutUrl={"/"}>
			<html lang="en">
				<body className={`${font.className}`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
