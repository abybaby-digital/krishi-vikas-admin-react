import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { fetchNotificationScheduleList } from "@/services/api"; // <-- Update this function to fetch your notification schedule data
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import ViewNotification from "./ViewNotification";

export default function NotificationScheduleList() {
    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleNotification, setSingleNotification] = useState({});
    const [search, setSearch] = useState("");

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["notification-schedule-list"],
        queryFn: async () => await fetchNotificationScheduleList(token),
    });

    const columns = [
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        className="bg-white shadow rounded-lg p-2 hover:scale-90"
                        onClick={() => {
                            setModal(true);
                            setSingleNotification(row);
                        }}
                    >
                        <BsEyeFill />
                    </button>
                    <Link
                        className="bg-white shadow rounded-lg p-2 hover:scale-90"
                        to={`/notification/notification-schedule/edit/${row.id}`}
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
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Notification Date",
            selector: (row) => row.notification_date,
        },
        {
            name: "Notification Time",
            selector: (row) => `${row.notification_time} Hrs`,
        },
        {
            name: "Redirect URL",
            cell: (row) => (
                <a href={row.redirection_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Open Link
                </a>
            ),
        },
        {
            name: "Status",
            selector: (row) => (row.status === "1" ? "Active" : "Inactive"),
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
            item.description?.toLowerCase().includes(searchText) ||
            item.redirection_url?.toLowerCase().includes(searchText)
        );
    }) || [];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Notification Schedule List" />

                <div className="form-wrapper bg-white p-5">
                    <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5">
                        <h2 className="text-2xl font-bold">Notification Schedule List</h2>
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
                                data={filteredData}
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

                {/* Optional Modal Component for Viewing Single Notification */}
                <ViewNotification modal={modal} setModal={setModal} singleNotification={singleNotification} />
            </SidebarInset>
        </SidebarProvider>
    );
}
