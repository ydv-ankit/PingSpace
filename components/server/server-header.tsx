"use client";

import { MemberRole } from "@/prisma/lib/generated/prisma";
import { ServerWithMemberWithProfiles } from "@/types";
import { useParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Plus, Settings, TrashIcon, UserPlus, Users } from "lucide-react";
import { useModel } from "@/hooks/use-model-store";

interface ServerHeaderProps {
    server: ServerWithMemberWithProfiles,
    role?: MemberRole
}

export default function ServerHeader({ server, role }: ServerHeaderProps) {
    const { onOpen } = useModel();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
            <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                {server.name}
                <ChevronDown className="h-4 w-4 ml-auto" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-semibold text-black dark:text-neutral-400 space-y-[2px]">
            {isModerator && (
                <DropdownMenuItem 
                    onClick={() => onOpen("invite", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("editServer", { server })}>
                    Server Settings
                    <Settings className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                    Manage Members
                    <Users className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                    Create Channel
                    <Plus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator/>
            )}
            {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500 hover:text-rose-600 dark:hover:text-rose-400">
                        Delete Server
                        <TrashIcon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
            )}
            {!isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500 hover:text-rose-600 dark:hover:text-rose-400">
                    Leave Server
                    <LogOut className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
}