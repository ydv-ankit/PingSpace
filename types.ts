import { Member, Profile, Server } from "./prisma/lib/generated/prisma";

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
