import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { fetchComboPlanList } from "../../../services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import ViewComboPlan from "./ViewComboPlan";
import { useState } from "react";


export default function ComboBannerList() {

    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleComboData, setSingleCombo] = useState({});
    const [search, setSearch] = useState("");




    // Fetch combo plan data
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["combo-plan-list"],
        queryFn: async () => await fetchComboPlanList(token),
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
                        to={`/combo-plan/edit/${row.id}`}
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
            name: "Plan Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Plan Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Plan Duration (days)",
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Banner Feature",
            selector: (row) => row.banner_feature_name,
            sortable: true,
        },
        {
            name: "Boost Feature",
            selector: (row) => row.boost_feature_name,
            sortable: true,
        },
        {
            name: "Number of Boosts",
            selector: (row) => row.no_of_boost,
            sortable: true,
        },
        {
            name: "Number of Products",
            selector: (row) => row.no_of_product,
            sortable: true,
        },
        {
            name: "Categories",
            selector: (row) => row.category_names,
            sortable: true,
        },
        {
            name: "States",
            selector: (row) => row.state_names,
            sortable: true,
        },
        {
            name: "Promotion Tag",
            cell: (row) => (
                <>
                    {row.promotional_tag_name}
                    {/* <img src={row.promotional_tag_icon} alt="promotional_tag_icon" /> */}
                </>
            ),
            sortable: true,
        },
        {
            name: "Package Description",
            selector: (row) => row.package_description,
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
            item.name?.toLowerCase().includes(searchText) ||
            item.banner_feature_name?.toLowerCase().includes(searchText) ||
            item.boost_feature_name?.toLowerCase().includes(searchText) ||
            item.category_names?.toLowerCase().includes(searchText) ||
            item.state_names?.toLowerCase().includes(searchText) ||
            item.promotional_tag_name?.toLowerCase().includes(searchText) ||
            item.package_description?.toLowerCase().includes(searchText)
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
                            <h2 className="text-2xl text-center font-bold text-center font-dmsans">
                                Combo Banner Uploaded
                            </h2>
                            

                        </div>
                        <Link to="/combo-plan/combo-plan-purchase-list" className="text-blue-500 block text-center">Upload Another One</Link>

                        
                        
                    </div>
                    <ViewComboPlan modal={modal} setModal={setModal} singleComboData={singleComboData} />
                </SidebarInset>
            </SidebarProvider>
        </>

    );
}
