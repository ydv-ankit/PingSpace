import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";

export const NavigationSidebar = async () => {
	const profile = await currentProfile();

	if (!profile) {
		return redirect("/");
	}

	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	return (
		<div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
			<NavigationAction />
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md data-[orientation=horizontal]:w-10 mx-auto" />
			<ScrollArea className="flex-1 w-full">
				<div className="space-y-1">
					{servers.map((server) => (
						<div key={server.id} className="flex items-center mb-4">
							<NavigationItem
								id={server.id}
								imageUrl={server.imageUrl}
								name={server.name}
							/>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};
