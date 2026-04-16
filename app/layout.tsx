import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBarArticle } from "./_components/SideBarArticle";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={true}>
          <SideBarArticle />
          <main className="flex flex-1 flex-col overflow-y-auto">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
