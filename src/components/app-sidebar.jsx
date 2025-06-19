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
import { IoNewspaper } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";


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
  navMain: [
    {
      title: "Dashboard",
      hasSubMenu: false,
      url: "/",
      icon: TbLayoutDashboardFilled,
    },
    {
      title: "User Profiles",
      hasSubMenu: true,
      url: "#",
      icon: FaUsers,
      items: [
        {
          title: "User Lists",
          url: "/user/user-list",
        },
      ],
    },
    {
      title: "Tractor",
      hasSubMenu: true,
      url: "#",
      icon: PiTractorFill,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/tractor/add-post",
        // },
        {
          title: "Post Lists",
          url: "/tractor/post-list",
        },
        {
          title: "Brands",
          url: "/tractor/brands",
        },
        {
          title: "Models",
          url: "/tractor/models",
        },
        // {
        //   title: "Specifications",
        //   url: "/tractor/spec",
        // },

      ],
    },
    {
      title: "Goods Vehicle",
      hasSubMenu: true,
      url: "#",
      icon: FaTruck,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/goods-vehicle/add-post",
        // },
        {
          title: "Post Lists",
          url: "/goods-vehicle/post-list",
        },
        {
          title: "Brands",
          url: "/goods-vehicle/brands",
        },
        {
          title: "Models",
          url: "/goods-vehicle/models",
        },
        // {
        //   title: "Specifications",
        //   url: "/goods-vehicle/spec",
        // },
      ],
    },
    {
      title: "Harvester",
      hasSubMenu: true,
      url: "#",
      icon: GiFarmTractor,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/harvester/add-post",
        // },
        {
          title: "Post Lists",
          url: "/harvester/post-list",
        },
        {
          title: "Brands",
          url: "/harvester/brands",
        },
        {
          title: "Models",
          url: "/harvester/models",
        },
        // {
        //   title: "Specifications",
        //   url: "/harvester/spec",
        // },

      ],
    },
    {
      title: "Implements",
      hasSubMenu: true,
      url: "#",
      icon: GiFarmer,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/implements/add-post",
        // },
        {
          title: "Post Lists",
          url: "/implements/post-list",
        },
        {
          title: "Brands",
          url: "/implements/brands",
        },
        {
          title: "Models",
          url: "/implements/models",
        },
        // {
        //   title: "Specifications",
        //   url: "/implements/spec",
        // },

      ],
    },
    {
      title: "Tyres",
      hasSubMenu: true,
      url: "#",
      icon: GiTyre,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/tyres/add-post",
        // },
        {
          title: "Post Lists",
          url: "/tyres/post-list",
        },
        {
          title: "Brands",
          url: "/tyres/brands",
        },
        {
          title: "Models",
          url: "/tyres/models",
        },
        // {
        //   title: "Specifications",
        //   url: "/tyres/spec",
        // },

      ],
    },
    {
      title: "Seeds",
      hasSubMenu: true,
      url: "#",
      icon: GiPlantSeed,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/seeds/add-post",
        // },
        {
          title: "Post Lists",
          url: "/seeds/post-list",
        },
        // {
        //   title: "Posts",
        //   url: "/seeds/posts",
        // },
      ],
    },
    {
      title: "Pesticides",
      hasSubMenu: true,
      url: "#",
      icon: MdPestControl,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/pesticides/add-post",
        // },
        {
          title: "Post Lists",
          url: "/pesticides/post-list",
        },
      ],
    },
    {
      title: "Fertilizer",
      hasSubMenu: true,
      url: "#",
      icon: GiFertilizerBag,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/fertilizers/add-post",
        // },
        {
          title: "Post Lists",
          url: "/fertilizers/post-list",
        },
      ],
    },
    {
      title: "Premium Product",
      hasSubMenu: true,
      url: "#",
      icon: MdWorkspacePremium,
      items: [
        // {
        //   title: "Product Posts",
        //   url: "/fertilizers/add-post",
        // },
        {
          title: "Add Premium Product",
          url: "/premium-product/add",
        },
        {
          title: "Premium Product List",
          url: "/premium-product/product-list",
        },
      ],
    },
    {
      title: "Combo Plan",
      hasSubMenu: true,
      url: "#",
      icon: IoNewspaper,
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
        {
          title: "Combo Banner List",
          url: "/combo-plan/combo-banner-list",
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
        {
          title: "Notification Schedule",
          url: "/notification/notification-schedule",
        },
        {
          title: "Notification Schedule List",
          url: "/notification/notification-schedule-list",
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
