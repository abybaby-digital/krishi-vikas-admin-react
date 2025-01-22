"use client"

import { ChevronRight } from "lucide-react";
import { MdDashboard } from "react-icons/md";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup className="list-none p-2">
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}

      <SidebarMenu>
        <NavLink to="/" className="admin-navlink">
          <SidebarMenuItem className="shadow mb-2 rounded-xl">

            <SidebarMenuButton tooltip="Dashboard" className="hover:bg-transparent active:bg-transparent text-[15px] py-6">
              {/* {item.icon && <item.icon />} */}
              <MdDashboard />
              <span>Dashboard</span>
              <ChevronRight
                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </NavLink>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem className="shadow mb-2 rounded-xl">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="hover:bg-transparent active:bg-transparent text-[15px] py-6">
                  {item.icon && <item.icon className="w-96" />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <NavLink to={subItem.url} className="admin-navlink">
                        <SidebarMenuSubButton asChild>
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </NavLink>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
