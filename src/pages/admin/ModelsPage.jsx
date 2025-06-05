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
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBrandsList, fetchModelAll } from "../../services/api"
import DataLoader from "../../components/DataLoader"
import DataTable from "react-data-table-component"
import { useSelector } from "react-redux"
import { MdEditDocument } from "react-icons/md"
import EditModelModal from "./EditModelModal"
import AdminHeader from "../../components/admin/AdminHeader"

export default function BrandsPage() {

    const { category } = useParams();
    const [refetchList, setRefetchList] = useState(false);
    const [modelId, setModelId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [modal, setModal] = useState(false);
    const [brandSelected, setBrand] = useState(null); // initially null
    const [searchText, setSearchText] = useState("");
    const token = useSelector((state) => state.auth.token);

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

    const { data: brandListData, isSuccess: brandListSuccess } = useQuery({
        queryKey: ["brand-list", category],
        queryFn: async () => {
            return await fetchBrandsList(token, getCategoryId(category));
        },
    });

    // Set first brand ID after brand list loads
    useEffect(() => {
        if (brandListSuccess && brandListData?.response?.length > 0) {
            setBrand(brandListData.response[0].value); // Set first brand as default
        }
    }, [brandListSuccess, brandListData]);

    // Fetch Model List (only when brandSelected is set)
    const { data: allModelList, isLoading: allModelsLoading } = useQuery({
        queryKey: ["modelListAll", category, refetchList, brandSelected],
        queryFn: async () => {
            return await fetchModelAll(token, getCategoryId(category), +brandSelected);
        },
        enabled: !!brandSelected, // Don't run until brandSelected is set
    });


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
                            setModelId(row.id);
                            setBrandId(row.brand_id);
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
            name: 'Brand Name',
            selector: row => row.brand_name,
            sortable: true,
        },
        {
            name: 'Model Name',
            selector: row => row.model_name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category_name,
            sortable: true,
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
                    <a href={row.icon} data-fancybox={row.id} className="w-full h-full block">
                        <img src={row.icon}
                            alt={row.model_name}
                            className="w-full h-full" />
                    </a>

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
                <AdminHeader head_text="Models" />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-5  bg-whitesmoke">
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-[350px,1fr] grid-cols-1  rounded-2xl p-5 bg-white shadow">
                        {/* <BrandsCreate />
                        <BrandsTable /> */}
                        <ModelsCreate category={category} />
                        <div className="bg-white rounded-2xl shadow overflow-hidden p-2 text-xl">
                            <div className="flex justify-between items-center px-5">
                                <p className="my-3 uppercase text-center font-bold text-darkGreen">{`${category === "goods-vehicle" ? "goods vehicle" : category} Models`}</p>
                                <div className="flex items-center gap-2">
                                    <div className="filter-by-brands ">
                                        <select
                                            className="text-lg px-2 py-1 border rounded-lg"
                                            onChange={(e) => setBrand(e.target.value)}
                                        >
                                            {
                                                brandListData?.response?.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="search-models">
                                        <input
                                            type="text"
                                            placeholder="Search models..."
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className="text-lg px-3 py-1 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                allModelsLoading ?
                                    <DataLoader />
                                    :
                                    <DataTable
                                        columns={columns}
                                        data={
                                            allModelList?.response?.filter(model =>
                                                model.model_name.toLowerCase().includes(searchText.toLowerCase())
                                            ) || []
                                        }
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

                {/* EDIT MODEL MODAL */}

                <EditModelModal modal={modal} refetchList={refetchList} setRefetchList={setRefetchList} setModal={setModal} category={category} modelId={modelId} brandId={brandId} />

            </SidebarInset>
        </SidebarProvider>
    )
}
