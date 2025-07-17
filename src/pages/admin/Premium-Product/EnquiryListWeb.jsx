import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill, BsFiletypeXlsx } from "react-icons/bs";
import { useState } from "react";
import { fetchWebEnquiryList } from "../../../services/api";
import ViewEnquiryModal from "./ViewEnquiryModal";
import * as XLSX from 'xlsx';

export default function EnquiryListWeb() {
    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleEnquiry, setSingleEnquiry] = useState({});
    const [search, setSearch] = useState("");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["web-enquiry-list"],
        queryFn: () => fetchWebEnquiryList(token),
    });

    const columns = [
        {
            name: "Actions",
            width: "100px",
            cell: (row) => (
                <button
                    className="bg-white shadow rounded-lg p-2 hover:scale-90"
                    onClick={() => {
                        setModal(true);
                        setSingleEnquiry(row);
                        console.log(row);

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
            name: "Post ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) =>
                row.premium_product_question_answer?.find(q => q.question === "Name")?.answer || "—",
            sortable: true,
        },
        {
            name: "Phone No",
            selector: (row) =>
                row.premium_product_question_answer?.find(q => q.question === "Phone No")?.answer || "—",
            sortable: true,
        },
        {
            name: "Pincode",
            selector: (row) =>
                row.premium_product_question_answer?.find(q => q.question === "Pincode")?.answer || "—",
            sortable: true,
        },
        {
            name: "Exchange Old Tractor",
            selector: (row) =>
                row.premium_product_question_answer?.find(q => q.question === "Exchange Old Tractor")?.answer || "—",
            sortable: true,
        },
        {
            name: "Buy Time",
            selector: (row) =>
                row.premium_product_question_answer?.find(q => q.question === "When will you buy?")?.answer || "—",
            sortable: true,
        },
        {
            name: "Brand",
            selector: (row) => row.brand_name || "—",
            sortable: true,
        },
        {
            name: "Model",
            selector: (row) => row.model_name || "—",
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.created_at).toLocaleString(),
            sortable: true,
        },
    ];


    const filteredData = (data?.response || []).filter((item) => {
        const text = search.toLowerCase();

        const answer = (key) =>
            item.premium_product_question_answer?.find(q => q.question === key)?.answer?.toString().toLowerCase() || "";

        return (
            answer("Name").includes(text) ||
            answer("Phone No").includes(text) ||
            answer("Pincode").includes(text) ||
            answer("Exchange Old Tractor").includes(text) ||
            answer("When will you buy?").includes(text) ||
            item.model_name?.toLowerCase().includes(text) ||
            item.brand_name?.toLowerCase().includes(text)
        );
    });

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

    const exportToExcel = (dataToExport) => {
        const mappedData = dataToExport.map((row) => {
            const getAnswer = (question) =>
                row.premium_product_question_answer?.find(q => q.question === question)?.answer || "";

            return {
                "Post ID": row.id,
                "User Name": getAnswer("Name"),
                "Phone No": getAnswer("Phone No"),
                "Pincode": getAnswer("Pincode"),
                "Exchange Old Tractor": getAnswer("Exchange Old Tractor"),
                "Buy Time": getAnswer("When will you buy?"),
                "Brand": row.brand_name || "",
                "Model": row.model_name || "",
                "Created At": new Date(row.created_at).toLocaleString(),
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(mappedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

        XLSX.writeFile(workbook, "enquiry_list.xlsx");
    };


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Web Enquiries" />
                <div className="form-wrapper bg-white p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 flex-grow"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2"
                            onClick={() => exportToExcel(filteredData)}
                        >
                            <BsFiletypeXlsx size={20} /> Download XLS
                        </button>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : isError ? (
                        <div className="text-red-500 text-center py-4">
                            Failed to load enquiries: {error?.message || "Unknown error"}
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
                                noDataComponent="No enquiries found."
                                customStyles={customStyles}
                            />
                        </div>
                    )}
                </div>

                <ViewEnquiryModal modal={modal} setModal={setModal} singleEnquiry={singleEnquiry} />
            </SidebarInset>
        </SidebarProvider>
    );
}
