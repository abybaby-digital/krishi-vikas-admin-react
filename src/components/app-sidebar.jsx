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
      title: "Tractor",
      url: "#",
      icon: PiTractorFill,
      isActive: true,
      items: [
        {
          title: "Brands",
          url: "/tractor/brands",
        },
        {
          title: "Models",
          url: "/tractor/models",
        },
        {
          title: "Specifications",
          url: "/tractor/spec",
        },
        {
          title: "Posts",
          url: "/tractor/posts",
        },
      ],
    },
    {
      title: "Goods Vehicle",
      url: "#",
      icon: FaTruck,
      isActive: false,
      items: [
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Specifications",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Harvester",
      url: "#",
      icon: GiFarmTractor,
      isActive: false,
      items: [
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Specifications",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Implements",
      url: "#",
      icon: GiFarmer,
      isActive: false,
      items: [
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Specifications",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Tyres",
      url: "#",
      icon: GiTyre,
      isActive: false,
      items: [
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Specifications",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Seeds",
      url: "#",
      icon: GiPlantSeed,
      items: [
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Pesticides",
      url: "#",
      icon: MdPestControl,
      items: [
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Fertilizer",
      url: "#",
      icon: GiFertilizerBag,
      items: [
        {
          title: "Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Subscription Manager",
      url: "#",
      icon: CgCreditCard,
      items: [
        {
          title: "Subscription Plan",
          url: "#",
        },
        {
          title: "Subscribed User",
          url: "#",
        },
        {
          title: "Subscribed Boots List",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
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
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
