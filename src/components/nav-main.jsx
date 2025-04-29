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
import SidebarCustom from "./SidebarCustom";

import { IoIosArrowDown } from "react-icons/io";
import React from "react";

export function NavMain({
  items
}) {
  let hasSubmenu = true;
  return (
    (<SidebarGroup className="list-none p-2">
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      {/* <SidebarCustom menus={items} /> */}
      <aside className={`admin-panel-sidebar rounded-2xl overflow-hidden`}>
        <div className="overlay-sidebar"></div>
        <nav className='sidebar_wrapper'>
          <ul className='sidebar_menus'>

            {
              items?.map((menu, index) => (
                menu?.hasSubMenu ?
                  <li key={index} className={`sidebar_menu overflow-hidden bg-white m-2 p-1 rounded-lg shadow uppercase  ${menu?.hasSubMenu ? "has_submenu" : ""}`}>
                    <a href='#' className='block p-2 rounded-lg border border-dashed pt-3 ps-10 relative overflow-hidden transition-all text-sm'>
                      {menu.icon && React.createElement(menu.icon, { className: 'inline mb-1 me-1' })}
                      {menu.title}
                      {menu?.hasSubMenu ? <IoIosArrowDown className='inline absolute right-3 mt-[3px] arrow_down transition-all' /> : ""}
                    </a>
                    <ul className='submenu animate__animated animate__zoomIn animate__faster text-sm'>
                      {
                        menu?.items.map((submenu, subindex) => (
                          <li key={subindex}>
                            <NavLink to={submenu.url} className='block p-1 rounded-2xl border border-dashed  relative overflow-hidden transition-all text-[12px]'>{submenu.title}</NavLink>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                  :
                  <li key={index} className='sidebar_menu bg-white m-2 p-1 rounded-lg shadow uppercase'>
                    <NavLink to={menu.url} className='block p-2 rounded-lg border border-dashed pt-3 ps-10 relative overflow-hidden transition-all text-sm'>
                      {menu.icon && React.createElement(menu.icon, { className: 'inline mb-1 me-1' })}
                      {menu.title}
                    </NavLink>
                  </li>
              ))
            }
          </ul>
        </nav>
      </aside>
    </SidebarGroup>)
  );

}
