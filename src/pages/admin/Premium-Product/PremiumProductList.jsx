import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { categoryWiseProductList, fetchPremiumProductList } from "../../../services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import ViewPremiumProduct from "./ViewPremiumProduct";

export default function PremiumProductList() {
    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState(false);
    const [status, setStatus] = useState(false);
    const [singlePostData, setSinglePost] = useState({});
    const [search, setSearch] = useState("");
    const [skip, setSkip] = useState(null);
    const [take, setTake] = useState(null);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["premium-product-list", modal],
        queryFn: () => fetchPremiumProductList(token, skip, take, take),
    });

    const columns = [
        {
            name: "Actions",
            cell: (row) => (
                <button
                    className="bg-white shadow rounded-lg p-2 hover:scale-90"
                    onClick={() => {
                        setModal(true);
                        setSinglePost(row);
                    }}
                >
                    <BsEyeFill />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Status",
            selector: (row) => row.status === "0" ? (<span className="border border-dashed p-2 text-orange-500 border-orange-500">Pending</span>) :
                row.status === "1" ? (<span className="border border-dashed p-2 text-green-500 border-green-500">Approved</span>) : (<span className="border border-dashed p-2 text-red-500 border-red-500">Rejected</span>),
            sortable: true,
        },
        {
            name: "Post Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        // {
        //     name: "Brand ID",
        //     selector: (row) => row.brand_id,
        //     sortable: true,
        // },
        // {
        //     name: "Model ID",
        //     selector: (row) => row.model_id,
        //     sortable: true,
        // },

        {
            name: "Price",
            selector: (row) => `${row.price} ${row.rent_type ? (row.rent_type) : ""}`,
            sortable: true,
        },
        {
            name: "Price Negotiable",
            selector: (row) => row.is_negotiable ? "Yes" : "No",
            sortable: true,
        },


        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },

        {
            name: "Location",
            selector: (row) => row.area || row.address,
        },

    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#f3f4f6',
                color: '#13693a',
                fontWeight: 'bold',
                fontSize: '14px',
                textTransform: 'uppercase',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                minHeight: '48px',
                borderBottom: '1px solid #e5e7eb',
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e7eb',
                padding: '10px',
            },
        },
    };

    const filteredData = data?.response?.filter((item) => {
        const searchText = search.toLowerCase();
        return (
            item.title?.toLowerCase().includes(searchText) ||
            item.id.toString().includes(searchText) ||
            item.description?.toLowerCase().includes(searchText) ||
            item.type_new_or_old?.toLowerCase().includes(searchText) ||
            item.set_sell_or_rent?.toLowerCase().includes(searchText) ||
            item.registration_no?.toLowerCase().includes(searchText) ||
            item.area?.toLowerCase().includes(searchText)
        );
    }) || [];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Fertilizers Posts" />
                <div className="form-wrapper bg-white p-5">
                    <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5">
                        <h2 className="text-2xl font-bold text-center font-dmsans">Fertilizers Post List</h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : isError ? (
                        <div className="text-red-500 text-center py-4">
                            Failed to load tractor posts: {error?.message || "Unknown error"}
                        </div>
                    ) : (
                        <div className="table-wrapper bg-white shadow rounded-2xl overflow-hidden">
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                highlightOnHover
                                responsive
                                persistTableHead
                                noDataComponent="No tractor posts found."
                                customStyles={customStyles}
                            />
                        </div>
                    )}
                </div>

                <ViewPremiumProduct modal={modal} setModal={setModal} singlePostData={singlePostData} />
            </SidebarInset>
        </SidebarProvider>
    );
}
