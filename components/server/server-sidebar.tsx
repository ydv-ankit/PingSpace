import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@/prisma/lib/generated/prisma";

import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerHeader from "./server-header";

interface ServerSidebarProps {  
	serverId: string;
}

export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
	const profile = await currentProfile();

	if (!profile) {
		return redirect("/sign-in");
	}

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
        include:{
            channels:{
                orderBy: {
                    createdAt: "asc",
				},
			},
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
		},
	});

    if (!server) {
        return redirect("/");
    }

    const textChannels = server.channels.filter((channel) => channel.type === ChannelType.TEXT);

    const audioChannels = server.channels.filter((channel) => channel.type === ChannelType.AUDIO);

    const videoChannels = server.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server.members.filter((member) => member.profileId !== profile.id);

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

	return( <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
        <ServerHeader server={server} role={role} />
        <ScrollArea className="flex-1 px-3">
            <div className="mt-2">
                {/* <ServerSearch /> */}
            </div>
        </ScrollArea>
    </div>);
}