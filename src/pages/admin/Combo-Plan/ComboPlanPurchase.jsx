import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { useForm, Controller } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchComboPlanList, makeComboPlanPurchase, searchUserByPhoneNo } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";


export default function ComboPlanPurchase() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    // console.log(token);
    const [phoneNo, setPhoneNo] = useState(null);
    const [user, setUser] = useState(null);
    const [purchaseFormOpen, setPurchaseOpen] = useState(false);
    const [invoiceURL, setInvoiceURL] = useState(null);
    // console.log(phoneNo);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();


    // Fetch combo plan data
    const {
        data: comboPlanList,
    } = useQuery({
        queryKey: ["combo-plan-list"],
        queryFn: async () => await fetchComboPlanList(token),
    });

    const ComboPlanPurchaseMutation = useMutation({
        mutationFn: async (data) => {
            return await makeComboPlanPurchase(
                token,
                user?.id,
                data.combo_plan_id?.value,
                data.client_paid_price,
                data.tax_category.value,
                data.mode_of_transaction.value,
                data.transaction_type.value,
                data.check_no
            );
        },
        onSuccess: (response) => {
            console.log("response", response?.response?.invoiceUrl);

            if (response.success === 1) {
                toast.success("Combo Plan purchased successfully !!");
                // console.log(response.respose.invoiceUrl);
                // sessionStorage.setItem("invoiceURL", response.respose.invoiceUrl);
                // if (response.respose.invoiceUrl) {
                //     setInvoiceURL(response.respose.invoiceUrl);
                // }
                navigate("/combo-plan/combo-plan-purchase-list");
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
    });

    const onSubmit = (data) => {
        console.log(data);

        ComboPlanPurchaseMutation.mutate(data);
    };

    console.log(invoiceURL);

    const invoice_url_session = sessionStorage.getItem("invoiceURL");

    useEffect(() => {
        if (invoice_url_session) {
            setInvoiceURL(invoice_url_session);
        }
    }, [invoice_url_session])


    // SEARCH API

    const searchMutation = useMutation({
        mutationFn: async (phone_No) => {
            return await searchUserByPhoneNo(token, phone_No)
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                setPurchaseOpen(false);
                setUser(response.response);
                reset();
            }
            else {
                toast.error("No User Found !!");
            }
        }

    })

    // SELECTED COMBO PLAN FUNCTION
    const selectedComboPlan = watch("combo_plan_id");

    useEffect(() => {
        if (selectedComboPlan && comboPlanList?.response?.length) {
            const selected = comboPlanList.response.find(
                (plan) => plan.id === selectedComboPlan.value
            );
            if (selected) {
                setValue("plan_price", selected.price); // 👈 Set the price
                setValue("plan_duration", selected.duration); // Optional: auto-set duration
            }
        }
    }, [selectedComboPlan, comboPlanList, setValue]);


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Combo Plan" />

                <div className="search_form px-5 pt-5 pb-2">
                    <form action="" className="bg-white shadow rounded-xl p-5 flex justify-center items-center gap-2">
                        <label htmlFor="search_phone_no" className="text-xl text-darkGreen" >Search By Phone No :</label>
                        <input value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} type="text" className="p-2 shadow border focus:outline-none rounded-lg" placeholder="Enter Phone No.." />
                        <button onClick={() => { searchMutation.mutate(phoneNo) }} type="button" className="bg-lightdark text-white px-3 py-2 rounded-2xl active:scale-95" disabled={searchMutation.isPending || phoneNo?.length < 10}><IoIosSearch className="inline me-1 " />{searchMutation.isPending ? "Searching..." : "Search"}</button>
                    </form>
                </div>

                {
                    user &&
                    <div className="user_details p-5">
                        <div className="user bg-white shadow p-3 rounded-xl">
                            <table className="w-full">
                                <thead className="text-left bg-whitesmoke p-2">
                                    <th className="p-2">User Name</th>
                                    <th className="p-2">User Type</th>
                                    <th className="p-2">Company Name</th>
                                    <th className="p-2">GST No</th>
                                    <th className="p-2">User Phone No</th>
                                    <th className="p-2"></th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2">{user?.name}</td>
                                        <td className="p-2">{user?.user_type_name}</td>
                                        <td className="p-2">{user?.company_name}</td>
                                        <td className="p-2">{user?.gst_no}</td>
                                        <td className="p-2">{user?.mobile}</td>
                                        <td className="p-2">
                                            <button onClick={() => { setPurchaseOpen(true) }} className="bg-gradient-green text-white px-5 text-sm py-2 rounded-2xl active:scale-95"><IoAddCircleOutline className="inline text-xl me-1 mb-1" />ADD COMBO PLAN</button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                }

                {
                    purchaseFormOpen &&
                    <div className="form-wrapper bg-white p-5">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1"
                        >
                            <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                                <h2 className="text-2xl font-bold text-center font-dmsans">Combo Plan Purchase</h2>
                            </div>

                            {/* User Name */}
                            <div>
                                <label htmlFor="user_name" className="block font-bold text-sm mb-1">User Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    disabled
                                    value={user?.name}
                                    placeholder="Enter user name"
                                    className="w-full border px-3 py-2 rounded"

                                />

                            </div>
                            {/* User Type */}
                            <div>
                                <label htmlFor="user_type" className="block font-bold text-sm mb-1">User Type</label>
                                <input
                                    type="text"
                                    id="user_type"
                                    disabled
                                    value={user?.user_type_name}
                                    placeholder="Enter user name"
                                    className="w-full border px-3 py-2 rounded"

                                />

                            </div>

                            {/* Combo Plan ID */}
                            <div>
                                <label htmlFor="combo_plan_id" className="block font-bold text-sm mb-1">Choose Combo Plan</label>
                                <Controller
                                    name="combo_plan_id"
                                    control={control}
                                    rules={{ required: "Select combo plan" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={comboPlanList?.response.map(item => ({ value: item.id, label: item.name }))}
                                            placeholder="-- Select Combo Plan --"
                                            classNamePrefix="react-select"
                                        />
                                    )}
                                />
                                {errors.combo_plan_id && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.combo_plan_id.message}</p>
                                )}
                            </div>

                            {/* Plan Duration */}
                            <div>
                                <label htmlFor="plan_duration" className="block font-bold text-sm mb-1">Plan Duration (days)</label>
                                <input
                                    type="number"
                                    id="plan_duration"
                                    disabled
                                    placeholder="Enter duration in days"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("plan_duration", { required: "Enter duration" })}
                                />
                                {errors.plan_duration && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.plan_duration.message}</p>
                                )}
                            </div>

                            {/* Plan Price */}
                            <div>
                                <label htmlFor="plan_price" className="block font-bold text-sm mb-1">Plan Price</label>
                                <input
                                    type="number"
                                    id="plan_price"
                                    placeholder="Enter price"
                                    disabled
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("plan_price", { required: "Enter price" })}
                                />
                                {errors.plan_price && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.plan_price.message}</p>
                                )}
                            </div>

                            {/* Plan Paid Price */}
                            <div>
                                <label htmlFor="client_paid_price" className="block font-bold text-sm mb-1">Client Paid Price</label>
                                <input
                                    type="number"
                                    id="plan_price"
                                    placeholder="Enter amount paid to client"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("client_paid_price", { required: "Enter price" })}
                                />
                                {errors.client_paid_price && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.client_paid_price.message}</p>
                                )}
                            </div>



                            {/* Tax Category */}
                            <div>
                                <label htmlFor="tax_category" className="block font-bold text-sm mb-1">Tax Category</label>
                                <Controller
                                    name="tax_category"
                                    control={control}
                                    rules={{ required: "Select Tax Category" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[{ value: "gst", label: "gst" }, { value: "igst", label: "igst" }, { value: "cgst", label: "cgst" }]}
                                            placeholder="-- Select Tax Category --"
                                            classNamePrefix="react-select"
                                        />
                                    )}
                                />
                                {errors.tax_category && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.tax_category.message}</p>
                                )}
                            </div>

                            {/* Mode of Transaction */}
                            <div>
                                <label htmlFor="mode_of_transaction" className="block font-bold text-sm mb-1">Mode of Transaction</label>
                                <Controller
                                    name="mode_of_transaction"
                                    control={control}
                                    rules={{ required: "Select Mode of Transaction" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[{ value: "online", label: "online" }, { value: "offline", label: "offline" }]}
                                            placeholder="-- Select Mode of Transaction --"
                                            classNamePrefix="react-select"
                                        />
                                    )}
                                />
                                {errors.mode_of_transaction && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.mode_of_transaction.message}</p>
                                )}
                            </div>

                            {/*Transaction Type*/}
                            <div>
                                <label htmlFor="transaction_type" className="block font-bold text-sm mb-1">Transaction Type</label>
                                <Controller
                                    name="transaction_type"
                                    control={control}
                                    rules={{ required: "Select Transaction Type" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[{ value: "cash", label: "cash" }, { value: "check", label: "cheque" }]}
                                            placeholder="-- Select Transaction Type --"
                                            classNamePrefix="react-select"
                                        />
                                    )}
                                />
                                {errors.transaction_type && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.transaction_type.message}</p>
                                )}
                            </div>

                            {/* Check No */}
                            {
                                watch("transaction_type")?.value === "check" ?
                                    <div>
                                        <label htmlFor="check_no" className="block font-bold text-sm mb-1">Cheque No</label>
                                        <input
                                            type="number"
                                            id="check_no"
                                            placeholder="Enter Cheque No"

                                            className="w-full border px-3 py-2 rounded"
                                            {...register("check_no", { required: "Enter Cheque No" })}
                                        />
                                        {errors.check_no && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.check_no.message}</p>
                                        )}
                                    </div>
                                    : null
                            }


                            <div className="calculation-preview border border-dashed p-5 col-span-full flex justify-between">
                                <p><strong>Rate:</strong> {watch("client_paid_price")}</p>
                                <p><strong>Discount:</strong> {watch("plan_price") - (watch("client_paid_price") / 1.18)} </p>
                                <p><strong>18% GST:</strong> {watch("client_paid_price") - (watch("client_paid_price") / 1.18)} </p>
                                <p><strong>Amount:</strong> {watch("client_paid_price") / 1.18}</p>
                            </div>


                            {/* Submit Button */}
                            <div className="form-submit-btn mt-5 xl:col-span-4 lg:col-span-3 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                                <button
                                    type="submit"
                                    className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                >
                                    {ComboPlanPurchaseMutation.isPending ? "Submitting..." : "Submit Plan"}
                                </button>
                            </div>


                        </form>
                    </div>
                }
                {ComboPlanPurchaseMutation.isPending ? <Loader task={`Purchasing Combo Plan for ${user?.name} ...`} /> : null}
                {
                    invoiceURL &&
                    <div className="download-invoice absolute top-0 left-0 flex justify-center items-center w-full h-screen bg-[#00000081]">
                        <a href={invoiceURL} onClick={() => { setInvoiceURL(null) }} className="inline-block cursor-pointer bg-gradient-green text-2xl p-3 rounded-2xl text-white font-bold animate-pulse hover:animate-none"><FaFileDownload className="inline me-1 mb-1" /> Download Invoice</a>
                    </div>
                }
            </SidebarInset>
        </SidebarProvider>
    );
}
