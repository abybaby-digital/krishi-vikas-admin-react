import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { notificationContentList } from "../../../services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import ViewNotificationContent from "./ViewNotificationContent";
import ToolTipGlobal from "../../../components/ToolTipGlobal";


export default function NotificationContentList() {

    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleComboData, setSingleCombo] = useState({});
    const [search, setSearch] = useState("");

    // Fetch notification content data
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["notification-content-list"],
        queryFn: async () => await notificationContentList(token),
    });

    const saveSingleData = (notification) => {
        sessionStorage.setItem("notification", JSON.stringify(notification));
    }

    // Define table columns
    const columns = [
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">

                    <ToolTipGlobal toolText="View Notification Content">
                        <button
                            className="bg-white shadow rounded-lg p-2 hover:scale-90"
                            onClick={() => {
                                setModal(true); setSingleCombo(row);
                            }}
                        >
                            <BsEyeFill />
                        </button>
                    </ToolTipGlobal>

                    <ToolTipGlobal toolText="Edit Notification Content">
                        <Link
                            className="bg-white inline-block mt-1.5 shadow rounded-lg p-2 hover:scale-90"
                            to={`/notification/edit/${row.id}`}
                            onClick={() => { saveSingleData(row) }}
                        >
                            <AiFillEdit />
                        </Link>
                    </ToolTipGlobal>

                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Notification Type",
            selector: (row) => row.notification_type_name,
            sortable: true,
            width: "250px"
        },
        {
            name: "English Title",
            selector: (row) => row.ln_en_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "English Description",
            selector: (row) => row.ln_en_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Bengali Title",
            selector: (row) => row.ln_bn_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Bengali Description",
            selector: (row) => row.ln_bn_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Hindi Title",
            selector: (row) => row.ln_hn_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Hindi Description",
            selector: (row) => row.ln_hn_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Assamese Title",
            selector: (row) => row.ln_as_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Assamese Description",
            selector: (row) => row.ln_as_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Gujarati Title",
            selector: (row) => row.ln_gu_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Gujarati Description",
            selector: (row) => row.ln_gu_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Kannada Title",
            selector: (row) => row.ln_kn_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Kannada Description",
            selector: (row) => row.ln_kn_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Malayalam Title",
            selector: (row) => row.ln_ml_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Malayalam Description",
            selector: (row) => row.ln_ml_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Marathi Title",
            selector: (row) => row.ln_mr_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Marathi Description",
            selector: (row) => row.ln_mr_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Odia Title",
            selector: (row) => row.ln_or_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Odia Description",
            selector: (row) => row.ln_or_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Tamil Title",
            selector: (row) => row.ln_ta_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Tamil Description",
            selector: (row) => row.ln_ta_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Telugu Title",
            selector: (row) => row.ln_te_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Telugu Description",
            selector: (row) => row.ln_te_des,
            sortable: true,
            width: "250px"
        },
        {
            name: "Punjabi Title",
            selector: (row) => row.ln_pa_title,
            sortable: true,
            width: "250px"
        },
        {
            name: "Punjabi Description",
            selector: (row) => row.ln_pa_des,
            sortable: true,
            width: "250px"
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
            item.ln_en_title?.toLowerCase().includes(searchText) ||
            item.ln_en_des?.toLowerCase().includes(searchText) ||
            item.ln_bn_title?.toLowerCase().includes(searchText) ||
            item.ln_bn_des?.toLowerCase().includes(searchText) ||
            item.ln_hn_title?.toLowerCase().includes(searchText) ||
            item.ln_hn_des?.toLowerCase().includes(searchText) ||
            item.ln_as_title?.toLowerCase().includes(searchText) ||
            item.ln_as_des?.toLowerCase().includes(searchText) ||
            item.ln_gu_title?.toLowerCase().includes(searchText) ||
            item.ln_gu_des?.toLowerCase().includes(searchText) ||
            item.ln_kn_title?.toLowerCase().includes(searchText) ||
            item.ln_kn_des?.toLowerCase().includes(searchText) ||
            item.ln_ml_title?.toLowerCase().includes(searchText) ||
            item.ln_ml_des?.toLowerCase().includes(searchText) ||
            item.ln_mr_title?.toLowerCase().includes(searchText) ||
            item.ln_mr_des?.toLowerCase().includes(searchText) ||
            item.ln_or_title?.toLowerCase().includes(searchText) ||
            item.ln_or_des?.toLowerCase().includes(searchText) ||
            item.ln_ta_title?.toLowerCase().includes(searchText) ||
            item.ln_ta_des?.toLowerCase().includes(searchText) ||
            item.ln_te_title?.toLowerCase().includes(searchText) ||
            item.ln_te_des?.toLowerCase().includes(searchText) ||
            item.ln_pa_title?.toLowerCase().includes(searchText) ||
            item.ln_pa_des?.toLowerCase().includes(searchText)
        );
    }) || [];

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AdminHeader head_text="Notification Content" />
                    <div className="form-wrapper bg-white p-5">
                        <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                            <h2 className="text-2xl font-bold text-center font-dmsans">
                                Notification Content List
                            </h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search notifications..."
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : isError ? (
                            <div className="text-red-500 text-center py-4">
                                Failed to load notifications: {error?.message || "Unknown error"}
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
                                    noDataComponent="No notifications found."
                                    customStyles={customStyles}
                                />
                            </div>
                        )}
                    </div>
                    <ViewNotificationContent modal={modal} setModal={setModal} singleComboData={singleComboData} />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
