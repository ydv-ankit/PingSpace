import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {serverId: string}}){
    try {
        const serverId = params.serverId;
        const {name, imageUrl} = await req.json();

        if (!serverId) {
            return NextResponse.json({message: "Server ID is required"}, {status: 400});
        }

        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                name: name,
                imageUrl: imageUrl,
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log("PATCH_SERVER_INVITE_CODE", error);
        return NextResponse.json({message: "Internal Error"}, {status: 500});
    }
}