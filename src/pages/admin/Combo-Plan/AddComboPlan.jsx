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
import { addComboPlan, fetchBannerFeatureList, fetchBoostFeatureList } from "../../../services/api";
import toast from "react-hot-toast";

export default function AddComboPlan() {
    const token = "39|hd8TaEg00toEaUp6MOjPjQJiPwgR6RuCnbZ5xHN5ab1184fc"; // Replace this with actual token (from context, cookie, etc.)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const {
        data: bannerFeatures,
        isLoading: bannerLoading,
        error: bannerError,
    } = useQuery({
        queryKey: ["bannerFeatures"],
        queryFn: () => fetchBannerFeatureList(token),
    });

    const {
        data: boostFeatures,
        isLoading: boostLoading,
        error: boostError,
    } = useQuery({
        queryKey: ["boostFeatures"],
        queryFn: () => fetchBoostFeatureList(token),
    });

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
                <header className="flex h-16 shadow-lg border-b items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block text-xl">
                                    <BreadcrumbLink href="#">Combo Plan</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="form-wrapper bg-white p-5">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1"
                    >
                        <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                            <h2 className="text-2xl font-bold text-center font-dmsans">Add Combo Plan</h2>
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
                                        options={[
                                            { value: "1", label: "Category 1" },
                                            { value: "3", label: "Category 3" },
                                            { value: "4", label: "Category 4" }
                                        ]}
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
                                        options={[
                                            { value: "5", label: "State 5" },
                                            { value: "8", label: "State 8" },
                                            { value: "9", label: "State 9" }
                                        ]}
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
                                        options={[{ value: "3", label: "Tag 3" }]}
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
                                {...register("package_description", { required: "Enter package description" })}
                            />
                            {errors.package_description && (
                                <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.package_description.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-submit-btn mt-5 xl:col-span-4 lg:col-span-3 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                            <button
                                type="submit"
                                className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                            >
                                {addComboPlanMutation.isPending ? "Submitting..." : "Submit Plan"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
