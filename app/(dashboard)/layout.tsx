import { UserButton } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBarArticle } from "../_components/SideBarArticle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideBarArticle />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <SidebarTrigger />
          <UserButton />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
