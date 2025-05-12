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

import BrandsTable from "../../components/admin/brands/BrandsTable"
import BrandsCreate from "../../components/admin/brands/BrandsCreate"
import ModelsCreate from "../../components/admin/models/ModelsCreate"
import ModelsTable from "../../components/admin/models/ModelsTable"

export default function BrandsPage() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shadow shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        {/* <SidebarTrigger className="-ml-1" /> */}
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block text-xl">
                                    <BreadcrumbLink href="#">
                                        Models
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
                <div className="flex flex-1 flex-col gap-4 p-4 pt-5  bg-whitesmoke">
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-[350px,1fr] grid-cols-1  rounded-2xl p-5 bg-white shadow">
                        {/* <BrandsCreate />
                        <BrandsTable /> */}
                        <ModelsCreate />
                        <ModelsTable />
                    </div>

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
