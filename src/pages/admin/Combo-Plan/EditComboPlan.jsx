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
import { addComboPlan, editComboPlan, fetchBannerFeatureList, fetchBoostFeatureList, fetchCategoryList, fetchPromotionTagList, fetchSingleComboPlanDetails, fetchStateList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditComboPlan() {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);


    const token = useSelector((state) => state.auth.token);
    console.log(token);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    // BANNER FEATURE LIST
    const {
        data: bannerFeatures,
        isLoading: bannerLoading,
        error: bannerError,
    } = useQuery({
        queryKey: ["bannerFeatures"],
        queryFn: () => fetchBannerFeatureList(token),
    });

    // BOOST FEATURE LIST
    const {
        data: boostFeatures,
        isLoading: boostLoading,
        error: boostError,
    } = useQuery({
        queryKey: ["boostFeatures"],
        queryFn: () => fetchBoostFeatureList(token),
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

    // STATE LIST

    const {
        data: stateList,
        isLoading: stateLoading,
        error: stateError,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
    });

    // PROMOTION TAG LIST

    const {
        data: promotionTagList,
        isLoading: promotionTagLoading,
        error: promotionTagError,
    } = useQuery({
        queryKey: ["promotionTagList"],
        queryFn: () => fetchPromotionTagList(token),
    });

    // FETCH SINGLE COMBO PLAN DETAILS

    const {
        data: singleComboPlanDetails,
        isLoading: singleComboPlanDetailsLoading,
        error: singleComboPlanDetailsError,
    } = useQuery({
        queryKey: ["singleComboPlanDetails", id],
        queryFn: () => fetchSingleComboPlanDetails(token, id),
    });



    const singleComboPlan = singleComboPlanDetails?.response;
    console.log(singleComboPlan);
    useEffect(() => {
        if (singleComboPlan) {
            reset({
                plan_name: singleComboPlan.name,
                plan_duration: singleComboPlan.duration,
                plan_price: singleComboPlan.price,
                banner_feature_id: bannerFeatures?.response?.find(item => item.value === singleComboPlan.banner_feature_id),
                boosts_feature_id: boostFeatures?.response?.find(item => item.value === singleComboPlan.boosts_feature_id),
                no_of_boost: singleComboPlan.no_of_boost,
                no_of_product: singleComboPlan.no_of_product,
                category_id: categoryList?.response?.filter(item => singleComboPlan.category_id?.split(',').includes(String(item.value))),
                state_id: stateList?.response?.filter(item => singleComboPlan.state_id?.split(',').includes(String(item.value))),
                package_description: singleComboPlan.package_description,
                promotion_tag_id: promotionTagList?.response?.find(item => item.value === singleComboPlan.promotional_tag_id),
            });
        }
    }, [
        singleComboPlan,
        bannerFeatures,
        boostFeatures,
        categoryList,
        stateList,
        promotionTagList,
        reset,
    ]);

    const isFormLoading =
        singleComboPlanDetailsLoading ||
        categoryLoading ||
        stateLoading ||
        bannerLoading ||
        boostLoading ||
        promotionTagLoading;


    const editComboPlanMutation = useMutation({
        mutationFn: async (data) => {
            return await editComboPlan(
                token,
                id,
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
        editComboPlanMutation.mutate(data);
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Combo Plan" />

                <div className="form-wrapper bg-white p-5">
                    {
                        isFormLoading ?
                            <Loader task="Preparing for edit.." />
                            :
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1"
                            >
                                <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                                    <h2 className="text-2xl font-bold text-center font-dmsans">Edit Combo Plan</h2>
                                </div>

                                {/* Plan Name */}
                                <div>
                                    <label htmlFor="plan_name" className="block font-bold text-sm mb-1">Plan Name</label>
                                    <input
                                        type="text"
                                        id="plan_name"
                                        placeholder="Enter plan name"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("plan_name", { required: "Enter Plan Name" })}
                                    />
                                    {errors.plan_name && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.plan_name.message}</p>
                                    )}
                                </div>

                                {/* Plan Duration */}
                                <div>
                                    <label htmlFor="plan_duration" className="block font-bold text-sm mb-1">Plan Duration (days)</label>
                                    <input
                                        type="number"
                                        id="plan_duration"
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
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("plan_price", { required: "Enter price" })}
                                    />
                                    {errors.plan_price && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.plan_price.message}</p>
                                    )}
                                </div>

                                {/* Banner Feature ID */}
                                <div>
                                    <label htmlFor="banner_feature_id" className="block font-bold text-sm mb-1">Banner Feature</label>
                                    <Controller
                                        name="banner_feature_id"
                                        control={control}
                                        rules={{ required: "Select banner feature" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={bannerFeatures?.response}
                                                placeholder="-- Select Feature --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.banner_feature_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.banner_feature_id.message}</p>
                                    )}
                                </div>

                                {/* Boost Feature ID */}
                                <div>
                                    <label htmlFor="boosts_feature_id" className="block font-bold text-sm mb-1">Boost Feature</label>
                                    <Controller
                                        name="boosts_feature_id"
                                        control={control}
                                        rules={{ required: "Select boost feature" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={boostFeatures?.response}
                                                placeholder="-- Select Boost --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.boosts_feature_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.boosts_feature_id.message}</p>
                                    )}
                                </div>

                                {/* No. of Boosts */}
                                <div>
                                    <label htmlFor="no_of_boost" className="block font-bold text-sm mb-1">Number of Boosts</label>
                                    <input
                                        type="number"
                                        id="no_of_boost"
                                        placeholder="Enter boost count"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("no_of_boost", { required: "Enter number of boosts" })}
                                    />
                                    {errors.no_of_boost && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.no_of_boost.message}</p>
                                    )}
                                </div>

                                {/* No. of Products */}
                                <div>
                                    <label htmlFor="no_of_product" className="block font-bold text-sm mb-1">Number of Products</label>
                                    <input
                                        type="number"
                                        id="no_of_product"
                                        placeholder="Enter product count"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("no_of_product", { required: "Enter number of products" })}
                                    />
                                    {errors.no_of_product && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.no_of_product.message}</p>
                                    )}
                                </div>

                                {/* Category IDs */}
                                <div>
                                    <label htmlFor="category_id" className="block font-bold text-sm mb-1">Categories</label>
                                    <Controller
                                        name="category_id"
                                        control={control}
                                        rules={{ required: "Select category" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isMulti
                                                options={categoryList?.response}
                                                placeholder="-- Select Category --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.category_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.category_id.message}</p>
                                    )}
                                </div>

                                {/* State IDs */}
                                <div>
                                    <label htmlFor="state_id" className="block font-bold text-sm mb-1">States</label>
                                    <Controller
                                        name="state_id"
                                        control={control}
                                        rules={{ required: "Select state" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isMulti
                                                options={stateList?.response}
                                                placeholder="-- Select State --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.state_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.state_id.message}</p>
                                    )}
                                </div>

                                {/* Promotion Tag ID */}
                                <div>
                                    <label htmlFor="promotion_tag_id" className="block font-bold text-sm mb-1">Promotion Tag</label>
                                    <Controller
                                        name="promotion_tag_id"
                                        control={control}
                                        rules={{ required: "Select promotion tag" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={promotionTagList?.response}
                                                placeholder="-- Select Tag --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.promotion_tag_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.promotion_tag_id.message}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="package_description" className="block font-bold text-sm mb-1">Package Description</label>
                                    <input
                                        type="text"
                                        id="package_description"
                                        placeholder="Describe the package"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("package_description")}
                                    />

                                </div>

                                {/* Submit Button */}
                                <div className="form-submit-btn mt-5 xl:col-span-4 lg:col-span-3 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                                    <button
                                        type="submit"
                                        className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                    >
                                        {editComboPlanMutation.isPending ? "Submitting..." : "Submit Plan"}
                                    </button>
                                </div>


                            </form>
                    }
                </div>
                {editComboPlanMutation.isPending ? <Loader task="Editing Combo Plan..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
