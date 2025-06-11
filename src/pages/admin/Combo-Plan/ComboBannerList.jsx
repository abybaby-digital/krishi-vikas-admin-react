import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList, fetchComboBannerList, fetchComboPlanList, fetchLanguageList, fetchStateList } from "../../../services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import ViewComboPlan from "./ViewComboPlan";
import { useState } from "react";
import { BsFilterSquareFill } from "react-icons/bs";
import ViewComboBanner from "./ViewComboBanner";


export default function ComboBannerList() {

    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleComboData, setSingleCombo] = useState({});
    const [search, setSearch] = useState("");


    // FILTER PARAMETERS

    const [skip, setSkip] = useState(null);
    const [take, setTake] = useState(null);
    const [status, setStatus] = useState(null);
    const [stateIds, setStateIds] = useState(null);
    const [languageIds, setLanguageIds] = useState(null);
    const [categoryIds, setCategoryIds] = useState(null);



    // Fetch combo plan data
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["combo-banner-list", skip, take, status, stateIds, languageIds, categoryIds],
        queryFn: async () => await fetchComboBannerList(token, skip, take, status, stateIds, languageIds, categoryIds),
    });

    // STATE LIST
    const {
        data: stateList,
        isLoading: stateLoading,
        error: stateError,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
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

    // LANGUAGE LIST
    const {
        data: languageList,
        isLoading: languageLoading,
        error: languageError,
    } = useQuery({
        queryKey: ["languageList"],
        queryFn: () => fetchLanguageList(token),
    });

    // Define table columns
    const columns = [

        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        className="bg-white shadow rounded-lg p-2 hover:scale-90"
                        onClick={() => {
                            setModal(true); setSingleCombo(row);
                        }}
                    >
                        <BsEyeFill />
                    </button>
                    <Link
                        className="bg-white shadow rounded-lg p-2 hover:scale-90"
                        to={`/combo-plan/edit-combo-banner/${row.id}`}
                    >
                        <AiFillEdit />
                    </Link>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

        {
            name: "Banner Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "User Id",
            selector: (row) => row.user_id,
            sortable: true,
        },
        {
            name: "User Name",
            selector: (row) => row.user_name,
            sortable: true,
        },
        {
            name: "Banner Status",
            width: "200px",
            cell: (row) => (

                
                    <span className={`text-sm font-medium px-2 py-1 text-white rounded-xl ${row.status === "1" ? "bg-green-600" : "bg-red-600"}`}>
                        {row.status === "1" ? "Active" : "Inactive"}
                    </span>
                

            ),
        },
        {
            name: "Banner",
            width: "150px",
            cell: (row) => (

                <a href={row?.campaign_banner} data-fancybox={row.id} data-caption="Banner Image">
                    <img src={row?.campaign_banner} alt="image" className="h-12 w-auto rounded my-2" />
                </a>
            ),
        },
        {
            name: "Campaign Name",
            width: "250px",
            selector: (row) => row.campaign_name,
            sortable: true,
        },
        {
            name: "Combo Plan",
            width: "250px",
            selector: (row) => row.combo_plan_name,
            sortable: true,
        },
        {
            name: "User",
            width: "250px",
            selector: (row) => row.user_name,
            sortable: true,
        },
        {
            name: "Category",
            width: "250px",
            selector: (row) => row.campaign_category_name,
            sortable: true,
        },
        {
            name: "Language",
            width: "250px",
            selector: (row) => row.campaign_language,
            sortable: true,
        },
        {
            name: "State",
            width: "250px",
            selector: (row) => row.state_name || "All States",
            sortable: true,
        },
        {
            name: "Start Date",
            width: "250px",
            selector: (row) => row.banner_start_date,
            sortable: true,
        },
        {
            name: "End Date",
            width: "250px",
            selector: (row) => row.banner_end_date,
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

    // Search Function
    const filteredData = data?.response?.filter((item) => {
        const searchText = search.toLowerCase();
        return (
            item.campaign_name?.toLowerCase().includes(searchText) ||
            item.id?.toString().includes(searchText) ||
            item.user_id?.toString().includes(searchText) ||
            item.user_name?.toLowerCase().includes(searchText) ||
            item.combo_plan_name?.toLowerCase().includes(searchText) ||
            item.campaign_category_name?.toLowerCase().includes(searchText) ||
            item.campaign_language?.toLowerCase().includes(searchText) ||
            item.state_name?.toLowerCase().includes(searchText)
        );
    }) || [];




    return (

        <>

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AdminHeader head_text="Combo Plan" />

                    <div className="form-wrapper bg-white p-5">
                        <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                            <h2 className="text-2xl font-bold text-center font-dmsans">
                                Combo Banner List
                            </h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-4 form-heading bg-whitesmoke rounded-2xl mb-3 p-3">
                            {/* State Filter */}
                            <div className="flex items-center">
                                <BsFilterSquareFill className="inline me-1 mb-1" />
                                <select
                                    name="state"
                                    id="state"
                                    className="px-3 py-2 rounded-xl shadow w-full"
                                    value={stateIds || ""}
                                    onChange={(e) => setStateIds(e.target.value || null)}
                                >
                                    <option value="" disabled>Choose States</option>
                                    {
                                        stateList?.response.map((item, idx) => (
                                            <option key={idx} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center">
                                <BsFilterSquareFill className="inline me-1 mb-1" />
                                <select
                                    name="category"
                                    id="category"
                                    className="px-3 py-2 rounded-xl shadow w-full"
                                    value={categoryIds || ""}
                                    onChange={(e) => setCategoryIds(e.target.value || null)}
                                >
                                    <option value="" disabled>Choose Category</option>
                                    {
                                        categoryList?.response.map((item, idx) => (
                                            <option key={idx} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Language Filter */}
                            <div className="flex items-center">
                                <BsFilterSquareFill className="inline me-1 mb-1" />
                                <select
                                    name="language"
                                    id="language"
                                    className="px-3 py-2 rounded-xl shadow w-full"
                                    value={languageIds || ""}
                                    onChange={(e) => setLanguageIds(e.target.value || null)}
                                >
                                    <option value="" disabled>Choose Language</option>
                                    {
                                        languageList?.response.map((item, idx) => (
                                            <option key={idx} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center">
                                <BsFilterSquareFill className="inline me-1 mb-1" />
                                <select
                                    name="status"
                                    id="status"
                                    className="px-3 py-2 rounded-xl shadow w-full"
                                    value={status ?? ""}
                                    onChange={(e) => setStatus(e.target.value || null)}
                                >
                                    <option value="" disabled>Choose Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>


                            {
                                (stateIds || languageIds || categoryIds || status) &&
                                <div className="flex justify-end col-span-full">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                        onClick={() => {
                                            setStateIds(null);
                                            setCategoryIds(null);
                                            setLanguageIds(null);
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
                                Failed to load combo banner campaigns: {error?.message || "Unknown error"}
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
                                    noDataComponent="No combo banner campaigns found."
                                    customStyles={customStyles}
                                />
                            </div>
                        )}


                    </div>
                    <ViewComboBanner modal={modal} setModal={setModal} singleComboData={singleComboData} />
                </SidebarInset>
            </SidebarProvider>
        </>

    );
}
