import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { categoryWiseProductList, fetchCategoryList, fetchPremiumProductList } from "../../../services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill, BsFilterSquareFill } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
import { useState } from "react";
import ViewPremiumProduct from "./ViewPremiumProduct";
import { useNavigate } from "react-router-dom";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import ToolTipGlobal from "../../../components/ToolTipGlobal";

export default function PremiumProductList() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
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
        queryKey: ["premium-product-list", modal, categoryId],
        queryFn: () => fetchPremiumProductList(token, skip, take, categoryId),
    });

    // CATEGORY LIST
    const {
        data: categoryList,
        isLoading: categoryLoading,
        error: categoryError,
    } = useQuery({
        queryKey: ["categoryList"],
        queryFn: () => fetchCategoryList(token),
    });

    const columns = [
        {
            name: "Actions",
            width: "200px",
            cell: (row) => (
                <>
                    <ToolTipGlobal toolText="View Premium Product">
                        <button
                            className="bg-white shadow rounded-lg p-2 hover:scale-90 me-2"
                            onClick={() => {
                                setModal(true);
                                setSinglePost(row);
                            }}
                        >
                            <BsEyeFill />
                        </button>
                    </ToolTipGlobal>

                    <ToolTipGlobal toolText="Edit Premium Product">
                        <button
                            className="bg-white shadow rounded-lg p-2 hover:scale-90 me-2"
                            onClick={() => {
                                setModal(true);
                                setSinglePost(row);
                                navigate(`/premium-product/edit/${row.id}`)
                            }}
                        >
                            <MdEditDocument />
                        </button>
                    </ToolTipGlobal>

                    {/* <ToolTipGlobal toolText="Specifications">
                        <button
                            className="bg-white shadow rounded-lg p-2 hover:scale-90"
                            onClick={() => {
                                setModal(true);
                                setSinglePost(row);
                                navigate(`/spec/add-spec/${row.model_id}`);
                                sessionStorage.setItem("model_details", JSON.stringify(row));
                            }}
                        >
                            <MdOutlinePlaylistAdd />
                        </button>
                    </ToolTipGlobal> */}

                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        // {
        //     name: "Status",
        //     selector: (row) =>
        //         row.status === "0" ? (
        //             <span className="border border-dashed p-2 text-orange-500 border-orange-500">Pending</span>
        //         ) : row.status === "1" ? (
        //             <span className="border border-dashed p-2 text-green-500 border-green-500">Approved</span>
        //         ) : (
        //             <span className="border border-dashed p-2 text-red-500 border-red-500">Rejected</span>
        //         ),
        //     sortable: true,
        // },
        {
            name: "Post ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "User ID",
            selector: (row) => row.user_id,
            sortable: true,
        },
        {
            name: "Product Type",
            selector: (row) => row.product_type,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category_name,
            sortable: true,
        },
        {
            name: "Brand",
            selector: (row) => row.brand_name,
            sortable: true,
        },
        {
            name: "Model",
            selector: (row) => row.model_name,
            sortable: true,
        },
        {
            name: "Product Price",
            selector: (row) => `${row.product_price === null ? "" : `Rs. ${row.product_price}`}`,
            sortable: true,
        },
        {
            name: "Backend Price",
            selector: (row) => `${row.backend_price === undefined || null ? "" : `Rs. ${row.backend_price}`}`,
            sortable: true,
        },
        {
            name: "Boosted",
            selector: (row) => (row.is_boosted === "1" ? "Yes" : "No"),
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.product_description,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.created_at).toLocaleString(),
            sortable: true,
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
            item.user_id.toString().includes(searchText) ||
            item.brand_name.toLowerCase().includes(searchText) ||
            item.model_name.toLowerCase().includes(searchText) ||
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
                <AdminHeader head_text="Premium Product" />
                <div className="form-wrapper bg-white p-5">
                    <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5">
                        <h2 className="text-2xl font-bold text-center font-dmsans">Premium Product List</h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2 form-heading bg-whitesmoke rounded-2xl mb-3 p-3">


                        {/* Category Filter */}
                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1" />
                            <select
                                name="category"
                                id="category"
                                className="px-3 py-2 rounded-xl shadow w-full"
                                value={categoryId || ""}
                                onChange={(e) => setCategoryId(e.target.value || null)}
                            >
                                <option value="" disabled>Choose Category</option>
                                {
                                    categoryList?.response.map((item, idx) => (
                                        <option key={idx} value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {
                            (categoryId) &&
                            <div className="flex justify-end col-span-full">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    onClick={() => {
                                        setCategoryId(null);
                                        setStatus(null);
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        }


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
                                data={filteredData || []}
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
