import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill, BsFiletypeXlsx } from "react-icons/bs";
import { useState } from "react";
import { fetchAppEnquiryList } from "../../../services/api"; // Make sure this API exists
import ViewEnquiryModalApp from "./ViewEnquiryModalApp"; // Updated modal
import * as XLSX from 'xlsx';

export default function EnquiryListApp() {
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const [singleEnquiry, setSingleEnquiry] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["app-enquiry-list"],
    queryFn: () => fetchAppEnquiryList(token),
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
      name: "Category",
      selector: (row) => row.category_name || "—",
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.user_name || "—",
      sortable: true,
    },
    {
      name: "Responser Name",
      selector: (row) => row.responser_name || "—",
      sortable: true,
    },
    {
      name: "Responser Phone",
      selector: (row) => row.responser_phone_no || "—",
      sortable: true,
    },
    {
      name: "Responser Zipcode",
      selector: (row) => row.responser_zipcode || "—",
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
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
    },
  ];

  // Search filter
  const filteredData = (data?.response || []).filter((item) => {
    const text = search.toLowerCase();

    const answer = (key) =>
      item.premium_product_question_answer?.find(q => q.question === key)?.answer?.toString().toLowerCase() || "";

    return (
      item.category_name?.toLowerCase().includes(text) ||
      item.user_name?.toLowerCase().includes(text) ||
      item.responser_name?.toLowerCase().includes(text) ||
      item.responser_phone_no?.toLowerCase().includes(text) ||
      item.responser_zipcode?.toLowerCase().includes(text) ||
      item.brand_name?.toLowerCase().includes(text) ||
      item.model_name?.toLowerCase().includes(text) ||
      answer("Exchange Old Tractor").includes(text) ||
      answer("When will you buy?").includes(text)
    );
  });

  // Excel export
  const exportToExcel = (dataToExport) => {
    const mappedData = dataToExport.map((row) => {
      const getAnswer = (question) =>
        row.premium_product_question_answer?.find(q => q.question === question)?.answer || "";

      return {
        "Post ID": row.id,
        "Category": row.category_name || "",
        "User Name": row.user_name || "",
        "Responser Name": row.responser_name || "",
        "Responser Phone": row.responser_phone_no || "",
        "Responser Zipcode": row.responser_zipcode || "",
        "Brand": row.brand_name || "",
        "Model": row.model_name || "",
        "Exchange Old Tractor": getAnswer("Exchange Old Tractor"),
        "Buy Time": getAnswer("When will you buy?"),
        "Created At": new Date(row.created_at).toLocaleString(),
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "App Enquiries");

    XLSX.writeFile(workbook, "app_enquiry_list.xlsx");
  };

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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader head_text="App Enquiries" />
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

        <ViewEnquiryModalApp modal={modal} setModal={setModal} singleEnquiry={singleEnquiry} />
      </SidebarInset>
    </SidebarProvider>
  );
}
