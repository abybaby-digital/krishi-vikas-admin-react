import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { FaTruck } from "react-icons/fa";
import { PiTractorFill } from "react-icons/pi";
import { GiFarmTractor } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";
import { GiTyre } from "react-icons/gi";
import { GiPlantSeed } from "react-icons/gi";
import { MdPestControl } from "react-icons/md";
import { GiFertilizerBag } from "react-icons/gi";
import { CgCreditCard } from "react-icons/cg";
import { MdNotificationsActive } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import kvLogo from "../assets/images/kv-logo.png"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      hasSubMenu: false,
      url: "/",
      icon: TbLayoutDashboardFilled,
    },
    // {
    //   title: "Tractor",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: PiTractorFill,
    //   items: [
    //     {
    //       title: "Brands",
    //       url: "/tractor/brands",
    //     },
    //     {
    //       title: "Models",
    //       url: "/tractor/models",
    //     },
    //     {
    //       title: "Specifications",
    //       url: "/tractor/spec",
    //     },
    //     {
    //       title: "Posts",
    //       url: "/tractor/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Goods Vehicle",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: FaTruck,
    //   items: [
    //     {
    //       title: "Brands",
    //       url: "/goods vehicle/brands",
    //     },
    //     {
    //       title: "Models",
    //       url: "/goods vehicle/models",
    //     },
    //     {
    //       title: "Specifications",
    //       url: "/goods vehicle/spec",
    //     },
    //     {
    //       title: "Posts",
    //       url: "/goods vehicle/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Harvester",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: GiFarmTractor,
    //   items: [
    //     {
    //       title: "Brands",
    //       url: "/harvester/brands",
    //     },
    //     {
    //       title: "Models",
    //       url: "/harvester/models",
    //     },
    //     {
    //       title: "Specifications",
    //       url: "/harvester/spec",
    //     },
    //     {
    //       title: "Posts",
    //       url: "/harvester/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Implements",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: GiFarmer,
    //   items: [
    //     {
    //       title: "Brands",
    //       url: "/implements/brands",
    //     },
    //     {
    //       title: "Models",
    //       url: "/implements/models",
    //     },
    //     {
    //       title: "Specifications",
    //       url: "/implements/spec",
    //     },
    //     {
    //       title: "Posts",
    //       url: "/implements/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Tyres",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: GiTyre,
    //   items: [
    //     {
    //       title: "Brands",
    //       url: "/tyres/brands",
    //     },
    //     {
    //       title: "Models",
    //       url: "/tyres/models",
    //     },
    //     {
    //       title: "Specifications",
    //       url: "/tyres/spec",
    //     },
    //     {
    //       title: "Posts",
    //       url: "/tyres/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Seeds",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: GiPlantSeed,
    //   items: [
    //     {
    //       title: "Posts",
    //       url: "/seeds/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Pesticides",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: MdPestControl,
    //   items: [
    //     {
    //       title: "Posts",
    //       url: "/pesticides/posts",
    //     },
    //   ],
    // },
    // {
    //   title: "Fertilizer",
    //   hasSubMenu: true,
    //   url: "#",
    //   icon: GiFertilizerBag,
    //   items: [
    //     {
    //       title: "Posts",
    //       url: "/fertilizers/posts",
    //     },
    //   ],
    // },
    {
      title: "Combo Plan",
      hasSubMenu: true,
      url: "#",
      icon: GiFertilizerBag,
      items: [
        {
          title: "Add Combo Plan",
          url: "/combo-plan/add-combo-plan",
        },
        {
          title: "Combo Plan List",
          url: "/combo-plan/combo-plan-list",
        },
        {
          title: "Combo Plan Purchase",
          url: "/combo-plan/combo-plan-purchase",
        },
        {
          title: "Combo Plan Purchase List",
          url: "/combo-plan/combo-plan-purchase-list",
        },
      ],
    },
    {
      title: "Notification",
      hasSubMenu: true,
      url: "#",
      icon: MdNotificationsActive,
      items: [
        {
          title: "Add Notification Content",
          url: "/notification/add-notification-content",
        },
        {
          title: "Notification Content Info",
          url: "/notification/notification-content-list",
        },

      ],
    },

  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-3 bg-white">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <img src={kvLogo} alt="logo" className="w-[154px] mx-auto" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>)
  );
}
