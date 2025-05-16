import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { fetchComboPlanList, fetchComboPlanPurchaseList } from "../../../services/api"; // This should fetch purchase records
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import ViewComboPlan from "./ViewComboPlan";
import { useState } from "react";
import ViewComboPlanPurchase from "./ViewComboPlanPurchase";
import { FaDownload } from "react-icons/fa6";

export default function ComboPlanList() {
    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleComboData, setSingleCombo] = useState({});
    const [search, setSearch] = useState("");

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["combo-plan-purchase-list"],
        queryFn: async () => await fetchComboPlanPurchaseList(token),
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
                            setSingleCombo(row);
                        }}
                    >
                        <BsEyeFill />
                    </button>
                    {/* <Link
                        className="bg-white shadow rounded-lg p-2 hover:scale-90"
                        to={`/combo-plan/edit/${row.id}`}
                    >
                        <AiFillEdit />
                    </Link> */}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Invoice",
            cell: (row) => (
                <a
                    href={row.invoice_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-darkGreen border border-darkGreen hover:bg-lightdark hover:text-white px-2 py-1 inline-flex text-nowrap"
                >
                    <FaDownload className="inline me-1 mb-1"/>Download
                </a>
            ),
        },
        {
            name: "User Name",
            selector: (row) => row.user_name,
            sortable: true,
        },
        {
            name: "Company Name",
            selector: (row) => row.company_name,
        },
        {
            name: "Phone Number",
            selector: (row) => row.phone_no,
        },
        {
            name: "Plan Name",
            selector: (row) => row.plan_name,
        },
        {
            name: "Duration",
            selector: (row) => `${row.plan_duration} days`,
        },
        {
            name: "Start Date",
            selector: (row) => new Date(row.plan_start_date).toLocaleDateString(),
        },
        {
            name: "End Date",
            selector: (row) => new Date(row.plan_end_date).toLocaleDateString(),
        },
        {
            name: "Amount Paid",
            selector: (row) => `₹${parseFloat(row.customer_paid_amount).toFixed(2)}`,
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
            item.user_name?.toLowerCase().includes(searchText) ||
            item.company_name?.toLowerCase().includes(searchText) ||
            item.phone_no?.toLowerCase().includes(searchText) ||
            item.plan_name?.toLowerCase().includes(searchText) ||
            item.invoice_no?.toLowerCase().includes(searchText)
        );
    }) || [];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Combo Plan" />

                <div className="form-wrapper bg-white p-5">
                    <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5">
                        <h2 className="text-2xl font-bold">Combo Plan Purchase List</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="Search combo plan purchases..."
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
                            Failed to load combo plans: {error?.message || "Unknown error"}
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
                                noDataComponent="No combo plan purchases found."
                                customStyles={customStyles}
                            />
                        </div>
                    )}

                    <ViewComboPlanPurchase
                        modal={modal}
                        setModal={setModal}
                        singleComboData={singleComboData}
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
