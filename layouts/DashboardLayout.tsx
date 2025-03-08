import { ReactNode } from "react";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  title?: string;
  breadcrumbLinks?: { title: string; href?: string }[];
  children: ReactNode;
}

export default function DashboardLayout({
  breadcrumbLinks = [],
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar organizationType="school" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 p-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbLinks.map((link, index) => (
                <>
                  <BreadcrumbItem key={index} className="hidden md:block">
                    {link.href ? (
                      <BreadcrumbLink href={link.href}>
                        {link.title}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{link.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbLinks.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
