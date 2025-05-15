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
import { addComboPlan, fetchBannerFeatureList, fetchBoostFeatureList, fetchCategoryList, fetchPromotionTagList, fetchStateList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";

export default function AddNotificationContent() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    // console.log(token);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();




    const addComboPlanMutation = useMutation({
        mutationFn: async (data) => {
            return await addComboPlan(
                token,
                data.plan_name,
                data.plan_duration,
                data.plan_price,
                data.banner_feature_id.value,
                data.boosts_feature_id.value,
                data.no_of_boost,
                data.no_of_product,
                data.category_id.map((item) => item.value).join(","),
                data.state_id.map((item) => item.value).join(","),
                data.package_description,
                data.promotion_tag_id.value
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset();
                navigate("/combo-plan/combo-plan-list");
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error) => {
            toast.error("Failed to add combo plan. Please try again.");
        },
    });

    const onSubmit = (data) => {
        addComboPlanMutation.mutate(data);
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Notification" />

                <div className="form-wrapper bg-white p-5">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1"
                    >
                        <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 lg:col-span-2 col-span-1">
                            <h2 className="text-2xl font-bold text-center font-dmsans">Add Notification Content</h2>
                        </div>

                        {/* English Section */}
                        <div className="language-notification border border-dashed rounded-2xl p-5 relative overflow-hidden">
                            <p className="bg-gradient-green inline-block text-white absolute right-3 top-3 px-3 py-1 text-sm rounded-2xl">English</p>

                            {/* Title */}
                            <div className="mb-3 mt-6">
                                <label htmlFor="ln_en_title" className="block font-bold text-sm mb-1">Notification English Title</label>
                                <input
                                    type="text"
                                    id="ln_en_title"
                                    placeholder="Enter English title"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_en_title", { required: "Enter English Notification Title" })}
                                />
                                {errors.ln_en_title && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_en_title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="ln_en_des" className="block font-bold text-sm mb-1">Notification English Description</label>
                                <input
                                    type="text"
                                    id="ln_en_des"
                                    placeholder="Enter English description"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_en_des", { required: "Enter English Notification Description" })}
                                />
                                {errors.ln_en_des && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_en_des.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Bengali Section */}
                        <div className="language-notification border border-dashed rounded-2xl p-5 relative overflow-hidden">
                            <p className="bg-gradient-green inline-block text-white absolute right-3 top-3 px-3 py-1 text-sm rounded-2xl">Bengali</p>

                            {/* Title */}
                            <div className="mb-3 mt-6">
                                <label htmlFor="ln_bn_title" className="block font-bold text-sm mb-1">Notification Bengali Title</label>
                                <input
                                    type="text"
                                    id="ln_bn_title"
                                    placeholder="Enter Bengali title"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_bn_title", { required: "Enter Bengali Notification Title" })}
                                />
                                {errors.ln_bn_title && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_bn_title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="ln_bn_des" className="block font-bold text-sm mb-1">Notification Bengali Description</label>
                                <input
                                    type="text"
                                    id="ln_bn_des"
                                    placeholder="Enter Bengali description"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_bn_des", { required: "Enter Bengali Notification Description" })}
                                />
                                {errors.ln_bn_des && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_bn_des.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Hindi Section */}
                        <div className="language-notification border border-dashed rounded-2xl p-5 relative overflow-hidden">
                            <p className="bg-gradient-green inline-block text-white absolute right-3 top-3 px-3 py-1 text-sm rounded-2xl">Hindi</p>

                            {/* Title */}
                            <div className="mb-3 mt-6">
                                <label htmlFor="ln_hi_title" className="block font-bold text-sm mb-1">Notification Hindi Title</label>
                                <input
                                    type="text"
                                    id="ln_hi_title"
                                    placeholder="Enter Hindi title"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_hi_title", { required: "Enter Hindi Notification Title" })}
                                />
                                {errors.ln_hi_title && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_hi_title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="ln_hi_des" className="block font-bold text-sm mb-1">Notification Hindi Description</label>
                                <input
                                    type="text"
                                    id="ln_hi_des"
                                    placeholder="Enter Hindi description"
                                    className="w-full border px-3 py-2 rounded"
                                    {...register("ln_hi_des", { required: "Enter Hindi Notification Description" })}
                                />
                                {errors.ln_hi_des && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.ln_hi_des.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-submit-btn mt-5 lg:col-span-2 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                            <button
                                type="submit"
                                className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                            >
                                {addComboPlanMutation.isPending ? "Submitting..." : "Submit Plan"}
                            </button>
                        </div>
                    </form>


                </div>
                {addComboPlanMutation.isPending ? <Loader task="Creating Combo Plan..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
