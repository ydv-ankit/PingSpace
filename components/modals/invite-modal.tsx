"use client";

import {
	Dialog,
	DialogDescription,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModel } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

export function InviteModal() {
	const { isOpen, onClose, type, data, onOpen } = useModel();
	const origin = useOrigin();
	const isModalOpen = isOpen && type === "invite";

	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

	const onCopy = () => {
		if (!data.server?.inviteCode) {
			return;
		}
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const onNew = async () => {
	try {
		setIsLoading(true);
		const response = await axios.patch(`/api/servers/${data.server?.id}/invite-code`);
		onOpen("invite", { server: response.data });
	} catch (error) {
		console.log(error);
	} finally {
		setIsLoading(false);
	}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Invite People to your server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Send an invite link to a user to join your server.
					</DialogDescription>
				</DialogHeader>
				<div className="p-6">
					<Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
						Server Invite Link
					</Label>
					<div className="flex items-center mt-2 gap-x-2">
						<Input
							disabled={isLoading}
							value={inviteUrl}
							className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
						/>
						<Button disabled={!data.server?.inviteCode || isLoading} onClick={onCopy}>
								{copied ? <Check/> : <Copy className="w-4 h-4" />}
						</Button>
					</div>
					<Button variant={"link"} size={"sm"} className="text-xs text-zinc-500 mt-4" disabled={isLoading} onClick={onNew}>
						Generate New Link
						<RefreshCcw className={cn("w-4 h-4 ml-2", isLoading && "animate-spin")} />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

