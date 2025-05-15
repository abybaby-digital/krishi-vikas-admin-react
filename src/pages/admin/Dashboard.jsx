import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"



import { BsFileEarmarkPost } from "react-icons/bs";
import { BsFillPostageFill } from "react-icons/bs";
import { BsFilePost } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";


import LatestPostTable from "../../components/admin/dashboard/LatestPostTable"
import AdminHeader from "../../components/admin/AdminHeader";

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Dashboard" />
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
