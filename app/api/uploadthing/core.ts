import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
	const { userId } = await auth();
	console.log("userId", userId);

	if (!userId) throw new Error("Unauthorized");
	return { userId };
};

export const ourFileRouter = {
	serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(async () => {
			const { userId } = await handleAuth();
			return { userId };
		})
		.onUploadComplete(async ({}) => {}),
	messageFile: f(["image", "pdf"])
		.middleware(async () => {
			const { userId } = await handleAuth();
			return { userId };
		})
		.onUploadComplete(async ({}) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
