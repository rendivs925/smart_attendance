import * as React from "react";
import { getSidebarData } from "@/data/sidebarData";
import { SearchForm } from "@/components/common/sidebar/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { OrganizationType } from "@/types";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  organizationType: OrganizationType;
}

export function AppSidebar({ organizationType, ...props }: AppSidebarProps) {
  const sidebarData = getSidebarData(organizationType);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h4 className="m-0 text-left px-2">{sidebarData.title}</h4>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
