import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}
