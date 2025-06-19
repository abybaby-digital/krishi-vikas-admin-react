import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { fetchNotificationScheduleList } from "@/services/api";
import { useSelector } from "react-redux";
import DataLoader from "@/components/DataLoader";
import { BsEyeFill, BsFilterSquareFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import ViewNotification from "./ViewNotification";
import { fetchDistrictListByState, fetchLanguageList, fetchStateList, fetchUserList } from "../../../services/api";
import ToolTipGlobal from "../../../components/ToolTipGlobal";
import { setUsers } from "../../../redux/features/Auth/AuthSlice";
import { CgSearch } from "react-icons/cg";

export default function UserList() {

    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const [modal, setModal] = useState(false);
    const [singleNotification, setSingleNotification] = useState({});
    const [page, setPage] = useState(1);
    const [searchMobile, setSearchMobile] = useState("");
    const [mobile, setMobile] = useState(null);

    const [createdAt, setCreatedAt] = useState(null);
    const [stateIds, setStateIds] = useState(null);
    const [distIds, setDistIds] = useState(null);
    const [languageIds, setLanguageIds] = useState(null);
    const [userType, setUserType] = useState(null);


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setMobile(searchMobile ? searchMobile : null);
        }, 500); // 500ms debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchMobile]);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["user-profiles-list", page, languageIds, createdAt, stateIds, distIds, userType, mobile],
        queryFn: async () => await fetchUserList(token, mobile, stateIds, distIds, languageIds, createdAt, userType, (page - 1) * 10, 10),
        keepPreviousData: true,
    });

    const userTypeOptions = [
        {
            value: 1,
            label: "Buyer"
        },
        {
            value: 2,
            label: "Individual Seller"
        },
        {
            value: 3,
            label: "Dealer"
        },
        {
            value: 4,
            label: "Exchanger"
        },
    ]

    const notifications = Array.isArray(data?.response)
        ? data?.response
        : [];

    const totalRecords = typeof data?.total_records === "number"
        ? data?.total_records
        : 0;

    useEffect(() => {
        console.log("Fetched Notifications:", notifications);
        console.log("Total Records:", totalRecords);
    }, [data]);

    const {
        data: stateList,
        isLoading: stateLoading,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
    });

    // useEffect(() => {
    //     if (selectedStates.length) {
    //         // const stateIds = selectedStates.map((s) => s.value).join(",");
    //         // console.log(stateIds);
    //         fetchDistrictListByState(token, watch("states").join(",")).then((res) => {
    //             setDistrictOptions(res.response); // Expected format: [{label, value}]
    //         });
    //     } else {
    //         setDistrictOptions([]);
    //     }
    // }, [selectedStates , watch("states")]);

    // DISTRICT LIST
    const {
        data: districtList,
        isLoading: districtLoading,
        error: districtError,
    } = useQuery({
        queryKey: ["district-list", stateIds],
        queryFn: () => fetchDistrictListByState(token, stateIds),
    });

    // console.log("dist", districtList);


    // LANGUAGE LIST
    const {
        data: languageList,
        isLoading: languageLoading,
        error: languageError,
    } = useQuery({
        queryKey: ["languageList"],
        queryFn: () => fetchLanguageList(token),
    });

    const columns = [
        {
            name: "Actions",
            cell: (row) => (

                <div className="flex gap-2">
                    <ToolTipGlobal toolText="View User">
                        <button
                            className="bg-white shadow rounded-lg p-2 hover:scale-90"
                            onClick={() => {
                                navigate(`/user/user-details/${row.id}`)
                            }}
                        >
                            <BsEyeFill />
                        </button>
                    </ToolTipGlobal>

                    {/* <ToolTipGlobal toolText="Edit Notification Schedule">
                        <Link
                            className="bg-white inline-block mt-1.5 shadow rounded-lg p-2 hover:scale-90"
                            to={`/notification/notification-schedule/edit/${row.id}`}
                        >
                            <AiFillEdit />
                        </Link>
                    </ToolTipGlobal> */}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Created At",
            selector: (row) => row?.created_at.slice(0, 10) ?? "-",
        },
        {
            name: "User Id",
            selector: (row) => row?.id ?? "-",
            sortable: true,
        },
        {
            name: "User Name",
            selector: (row) => row?.name ?? "-",
        },
        {
            name: "User Type",
            selector: (row) => row?.user_type_name ?? "-",
        },
        {
            name: "Company Name",
            selector: (row) => row?.company_name ?? "-",
        },
        {
            name: "GST",
            selector: (row) => row?.gst_no ?? "-",
        },
        {
            name: "PAN",
            selector: (row) => row?.pan_no ?? "-",
        },
        {
            name: "Mobile",
            selector: (row) => row?.mobile ?? "-",
        },
        {
            name: "Email",
            selector: (row) => row?.email ?? "-",
        },
        {
            name: "State Name",
            selector: (row) => row?.state_name ?? "-",
        },
        {
            name: "District Name",
            selector: (row) => row?.district_name ?? "-",
        },
        {
            name: "Pincode",
            selector: (row) => row?.zipcode ?? "-",
        },
        {
            name: "Verify Tag",
            selector: (row) => row?.verify_tag ?? "-",
        },
        {
            name: "Profile Image",
            selector: (row) => row?.profile_img ?? "-",
        },
        {
            name: "Language Name",
            selector: (row) => row?.language_name ?? "-",
        },
        {
            name: "Profile Image",
            selector: (row) => row?.profile_img ?? "-",
        },
        
        {
            name: "Status",
            selector: (row) => (row?.status === "1" ? "Active" : "Inactive"),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#f3f4f6",
                color: "#13693a",
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "uppercase",
            },
        },
        rows: {
            style: {
                fontSize: "14px",
                minHeight: "48px",
                borderBottom: "1px solid #e5e7eb",
            },
        },
        cells: {
            style: {
                paddingLeft: "16px",
                paddingRight: "16px",
            },
        },
        pagination: {
            style: {
                borderTop: "1px solid #e5e7eb",
                padding: "10px",
            },
        },
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Users List" />

                <div className="form-wrapper bg-white p-5">
                    <div className="flex justify-between form-heading bg-whitesmoke rounded-2xl mb-5 p-5">
                        <h2 className="text-2xl font-bold">Users List</h2>
                        <div className="search-bar flex items-center  gap-1">
                            <input
                                type="number"
                                placeholder="Search by mobile no."
                                value={searchMobile}
                                className="p-2 border shadow rounded-xl"
                                onChange={(e) => setSearchMobile(e.target.value)}
                            />
                            {/* <button className="bg-black p-3 rounded-xl text-white" ><CgSearch /></button> */}
                        </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-5 form-heading bg-whitesmoke rounded-2xl mb-3 p-3">
                        {/* User Type Filter */}
                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1 flex-shrink-0" />
                            <select
                                name="user_type"
                                id="user_type"
                                className="px-3 py-2 rounded-xl shadow w-full"
                                value={userType || ""}
                                onChange={(e) => setUserType(e.target.value || null)}
                            >
                                <option value="" disabled>Choose User Type</option>
                                {
                                    userTypeOptions?.map((item, idx) => (
                                        <option key={idx} value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* State Filter */}
                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1 flex-shrink-0" />
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

                        {/* District Filter */}

                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1 flex-shrink-0" />
                            <select
                                name="category"
                                id="category"
                                className="px-3 py-2 rounded-xl shadow w-full"
                                value={distIds || ""}
                                onChange={(e) => setDistIds(e.target.value || null)}
                            >
                                <option value="" disabled>Choose District</option>
                                {
                                    districtList?.success === 1 && districtList?.response?.map((item, idx) => (
                                        <option key={idx} value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>



                        {/* Language Filter */}
                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1 flex-shrink-0" />
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

                        {/* Created At Filter */}
                        <div className="flex items-center">
                            <BsFilterSquareFill className="inline me-1 mb-1 flex-shrink-0" />
                            <input
                                type="date"
                                className="px-3 py-2 rounded-xl shadow w-full"
                                value={createdAt ?? ""}
                                onChange={(e) => setCreatedAt(e.target.value)}
                            />
                        </div>


                        {
                            (stateIds || languageIds || distIds || createdAt || userType) &&
                            <div className="flex justify-end col-span-full">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    onClick={() => {
                                        setStateIds(null);
                                        setCreatedAt(null);
                                        setLanguageIds(null);
                                        setDistIds(null);
                                        setUserType(null);
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        }

                    </div>

                    {isLoading ? (
                        <DataLoader />
                    ) : isError ? (
                        <div className="text-red-500 text-center py-4">
                            Failed to load notifications: {error?.message || "Unknown error"}
                        </div>
                    ) : (
                        <div className="table-wrapper bg-white shadow rounded-2xl overflow-hidden">
                            <DataTable
                                columns={columns}
                                data={notifications}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRecords}
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[]} // Hide rows per page dropdown
                                paginationDefaultPage={page}
                                onChangePage={(newPage) => setPage(newPage)}
                                highlightOnHover
                                responsive
                                persistTableHead
                                noDataComponent="No notifications found."
                                customStyles={customStyles}
                            />
                        </div>
                    )}
                </div>

                {/* <ViewNotification
                    modal={modal}
                    setModal={setModal}
                    singleNotification={singleNotification}
                /> */}
            </SidebarInset>
        </SidebarProvider>
    );
}
