"use client";

import { useEffect, useState } from "react";
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
  id: string;
  title: string;
  content: string;
}

interface AppSidebarProps {
  onSelectArticle?: (title: string) => void;
  selectedTitle?: string;
}

export function SideBarArticle({
  onSelectArticle,
  selectedTitle,
}: AppSidebarProps) {
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
                    isActive={selectedTitle === article.title}
                    onClick={() => onSelectArticle?.(article.title)}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{article.title}</span>
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
