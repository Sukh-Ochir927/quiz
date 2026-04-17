"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import { getArticles } from "../lib/articles/get-article";

interface Article {
  id: number;
  title: string;
  content: string;
}

export function SideBarArticle() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-base text-foreground">
          Quiz app
        </span>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {articles.map((article) => (
                <SidebarMenuItem key={article.id}>
                  <SidebarMenuButton
                    onClick={() => router.push(`/article/${article.id}`)}
                    className="w-full text-left px-4 py-2 text-sm"
                  >
                    <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <p className="truncate">{article.title}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
