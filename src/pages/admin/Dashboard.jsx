import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import dashCardBg from "../../assets/images/bg-dashcard.jpg"

import { BsFileEarmarkPost } from "react-icons/bs";
import { BsFillPostageFill } from "react-icons/bs";
import { BsFilePost } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";

import LatestPostTable from "../../components/admin/dashboard/LatestPostTable"

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shadow-lg border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-2 p-3  bg-whitesmoke">
                    <div className="grid auto-rows-min gap-4 xl:grid-cols-4 lg:grid-cols-2">
                        <div className="dash-card bg-white aspect-video rounded-3xl shadow border flex items-center justify-between p-5" >
                            <div className="bg-gradient-green p-3 aspect-square rounded-full">
                                <BsFileEarmarkPost className="text-4xl text-white" />
                            </div>
                            <div className="dash-card-content">
                                <p className="text-xl text-darkGreen">Total Posts</p>
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-sm text-gray-500">In all Categories</p>
                            </div>
                        </div>
                        <div className="dash-card bg-white aspect-video rounded-3xl shadow border flex items-center justify-between p-5" >
                            <div className="bg-gradient-green p-3 aspect-square rounded-full">
                                <BsFillPostageFill className="text-4xl text-white" />
                            </div>
                            <div className="dash-card-content">
                                <p className="text-xl text-darkGreen">Active Posts</p>
                                <p className="text-2xl font-bold">4185</p>
                                <p className="text-sm text-gray-500">In All active posts</p>
                            </div>
                        </div>
                        <div className="dash-card bg-white aspect-video rounded-3xl shadow border flex items-center justify-between p-5" >
                            <div className="bg-gradient-green p-3 aspect-square rounded-full">
                                <BsFilePost className="text-4xl text-white" />
                            </div>
                            <div className="dash-card-content">
                                <p className="text-xl text-darkGreen">Pending Posts</p>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-gray-500">In all categories</p>
                            </div>
                        </div>
                        <div className="dash-card bg-white aspect-video rounded-3xl shadow border flex items-center justify-between p-5" >
                            <div className="bg-gradient-green p-3 aspect-square rounded-full">
                                <BsPeopleFill className="text-4xl text-white" />
                            </div>
                            <div className="dash-card-content">
                                <p className="text-xl text-darkGreen">Subscribers</p>
                                <p className="text-2xl font-bold">76236</p>
                                <p className="text-sm text-gray-500">All active users</p>
                            </div>
                        </div>

                    </div>
                    <LatestPostTable />

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
