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
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { addBrand, fetchBrandAll } from "../../services/api"
import { useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { useState } from "react"
import DataLoader from "../../components/DataLoader"
import { MdEditDocument } from "react-icons/md"
import EditBrandModal from "./EditBrandModal"

export default function BrandsPage() {

    const { category } = useParams();
    const [refetchList, setRefetchList] = useState(false);
    const [brandId, setBrandId] = useState(null);
    const [modal, setModal] = useState(false);
    // console.log(category);
    const token = useSelector((state) => state.auth.token);

    // GET CATEGORY ID FUNCTION

    const getCategoryId = (category_name) => {
        switch (category_name) {
            case "tractor":
                return 1
            case "goods-vehicle":
                return 3
            case "harvester":
                return 4
            case "implements":
                return 5
            case "tyres":
                return 7
        }
    }

    const { data: allBrandList, isLoading: allBrandsLoading } = useQuery({
        queryKey: ["brandListAll", category, refetchList],
        queryFn: async () => {
            return await fetchBrandAll(token, getCategoryId(category));
        }
    })

    // console.log(data);

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: "Actions",
            width: "200px",
            cell: (row) => (
                <>
                    <button
                        className="bg-white shadow rounded-lg p-2 hover:scale-90 me-2"
                        onClick={() => {
                            setModal(true);
                            setBrandId(row.id);
                        }}
                    >
                        <MdEditDocument />
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category_name,
            sortable: true,
        },
        {
            name: 'Popular',
            selector: row => (row.popular ? 'Yes' : 'No'),
        },
        // {
        //     name: 'Status',
        //     selector: row => (row.status === '1' ? 'Active' : 'Inactive'),
        //     cell: row => (
        //         <span className={`badge ${row.status === '1' ? 'bg-success' : 'bg-danger'}`}>
        //             {row.status === '1' ? 'Active' : 'Inactive'}
        //         </span>
        //     ),
        // },
        {
            name: 'Logo',
            selector: row => row.logo,
            cell: row => (
                <div className="object-contain bg-white p-3 m-2 rounded-full h-[60px] shadow aspect-square">
                    <img
                        src={row.logo}
                        alt={row.name}
                        className="w-full h-full"
                    />
                </div>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                backgroundColor: '#f4f5f7',
                color: '#333',
                fontSize: '14px',
                paddingTop: '12px',
                paddingBottom: '12px',
                textTransform: 'uppercase',
            },
        },
    };


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
                                        Brands
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
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-[400px,1fr] grid-cols-1  rounded-2xl p-5 bg-white shadow">
                        <BrandsCreate category={category} refetchList={refetchList} setRefetchList={setRefetchList} />

                        <div className="bg-white rounded-2xl shadow overflow-hidden p-2 text-xl">
                            <p className="my-3 uppercase text-center font-bold text-darkGreen">{`${category === "goods-vehicle" ? "goods vehicle" : category} Brands`}</p>
                            {
                                allBrandsLoading ?
                                    <DataLoader />
                                    :
                                    <DataTable
                                        columns={columns}
                                        data={allBrandList?.response}
                                        pagination
                                        striped
                                        highlightOnHover
                                        responsive
                                        customStyles={customStyles}
                                    />
                            }
                        </div>
                    </div>

                </div>

                {/* EDIT BRAND MODAL */}

                <EditBrandModal modal={modal} refetchList={refetchList} setRefetchList={setRefetchList} setModal={setModal} category={category} brandId={brandId} />

            </SidebarInset>
        </SidebarProvider>
    )
}
