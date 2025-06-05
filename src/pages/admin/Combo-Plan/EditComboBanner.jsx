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
import { addComboBanner, editComboBanner, fetchCategoryList, fetchComboBannerDetailsById, fetchDistrictListByState, fetchLanguageList, fetchStateList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditComboBanner() {

    const { id } = useParams();

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [bannerPreview, setBannerPreview] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBannerPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            // console.log(imagePreview);
        } else {
            setBannerPreview(null);
        }
    };

    // STATE LIST
    const {
        data: stateList,
        isLoading: stateLoading,
        error: stateError,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
    });

    // DISTRICT LIST
    const {
        data: districtList,
        isLoading: districtLoading,
        error: districtError,
    } = useQuery({
        queryKey: ["districtList", watch("campaign_state")],
        queryFn: () => fetchDistrictListByState(token, watch("campaign_state").map((s) => s.value).join(",")),
    });

    // console.log(districtList);

    // CATEGORY LIST
    const {
        data: categoryList,
        isLoading: categoryLoading,
        error: categoryError,
    } = useQuery({
        queryKey: ["categoryList"],
        queryFn: () => fetchCategoryList(token),
    });


    // LANGUAGE LIST
    const {
        data: languageList,
        isLoading: languageLoading,
        error: languageError,
    } = useQuery({
        queryKey: ["languageList"],
        queryFn: () => fetchLanguageList(token),
    });

    // COMBO BANNER VIEW BY ID

    const {
        data: comboBannerById,
        isLoading: comboBannerLoading,
        error: comboBannerError,
    } = useQuery({
        queryKey: ["combobanner-details", id],
        queryFn: () => fetchComboBannerDetailsById(token, id),
    });

    useEffect(() => {

        setValue("user_name", comboBannerById?.response?.user_name);
        setValue("campaign_name", comboBannerById?.response?.campaign_name);
        setValue("campaign_state", comboBannerById?.response.selected_campaign_state);
        setValue("campaign_category", comboBannerById?.response.selected_campaign_category);
        setValue("seller_language_id", comboBannerById?.response.selected_campaign_language);
        setValue("campaign_district", comboBannerById?.response.selected_campaign_district);
        setBannerPreview(comboBannerById?.response.campaign_banner);

    }, [comboBannerById])

    const comboUser = JSON.parse(sessionStorage.getItem("combo-user"));
    console.log(comboUser);
    console.log(comboUser?.user_id,);
    console.log(comboUser?.plan_id);
    console.log(comboUser?.subscription_details_id);

    const editComboBannerMutation = useMutation({
        mutationFn: async (data) => {
            return await editComboBanner(
                token,
                +id,
                comboBannerById?.response.user_id,
                comboBannerById?.response.combo_plan_id,
                data.campaign_name,
                data.campaign_banner,
                data.campaign_state.map((item) => item.value).join(","),
                data.campaign_district.map((item) => item.value).join(","),
                data.campaign_category.map((item) => item.value).join(","),
                comboBannerById?.response.subscription_details_id,
                data.seller_language_id.map((item) => item.value).join(","),
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset();
                navigate("/combo-plan/combo-banner-list");
                // window.location.reload();
            } else {
                toast.error(response.message || "Something went wrong");
                setTimeout(() => {
                    // window.location.reload();
                }, 2000)
            }
        },
        onError: (error) => {
            toast.error("Failed to add combo banner. Please try again.");
        },
    });

    const onSubmit = (data) => {
        editComboBannerMutation.mutate(data);
        console.log(data);
    };


    const handleSelectAllStates = () => {
        setValue("campaign_state", stateList?.response);
    }
    const handleSelectAllDistrict = () => {
        setValue("campaign_district", districtList?.response);
    }
    const handleSelectAllCategory = () => {
        setValue("campaign_category", categoryList?.response);
    }
    const handleSelectAllLanguage = () => {
        setValue("seller_language_id", languageList?.response);
    }

    console.log(watch("campaign_state")?.map((s) => s.value).join(","));

    // useEffect(() => {
    //     setValue("campaign_district", [])
    // }, [watch("campaign_state")])


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Combo Banner" />

                {
                    comboBannerLoading ?
                        <Loader />
                        :
                        <div className="form-wrapper bg-white p-5">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid md:grid-cols-3 grid-cols-1 gap-3"
                            >
                                <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 col-span-full">
                                    <h2 className="text-2xl font-bold text-center font-dmsans">Edit Combo Banner</h2>
                                </div>

                                {/* User Name */}
                                <div>
                                    <label htmlFor="user_name" className="block font-bold text-sm mb-1">User Name</label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        placeholder="Enter user name"
                                        disabled
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("user_name")}
                                    />
                                </div>

                                {/* Campaign Name */}
                                <div>
                                    <label htmlFor="campaign_name" className="block font-bold text-sm mb-1">Campaign Name</label>
                                    <input
                                        type="text"
                                        id="campaign_name"
                                        placeholder="Enter Campaign name"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("campaign_name", { required: "Enter Campaign Name" })}
                                    />
                                </div>

                                {/* State IDs */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="campaign_state" className="block font-bold text-sm mb-1">States</label>
                                        {stateList?.response.length > 0 && (
                                            <button
                                                type="button"
                                                className="text-sm text-black hover:underline"
                                                onClick={handleSelectAllStates}
                                            >
                                                Select All States
                                            </button>
                                        )}
                                    </div>
                                    <Controller
                                        name="campaign_state"
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
                                    {errors.campaign_state && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.campaign_state.message}</p>
                                    )}
                                </div>


                                {/* District IDs */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="campaign_district" className="block font-bold text-sm mb-1">District</label>
                                        {districtList?.response.length > 0 && (
                                            <button
                                                type="button"
                                                className="text-sm text-black hover:underline"
                                                onClick={handleSelectAllDistrict}
                                            >
                                                Select All Districts
                                            </button>
                                        )}
                                    </div>
                                    <Controller
                                        name="campaign_district"
                                        control={control}
                                        rules={{ required: "Select District" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isMulti
                                                options={districtList?.response}
                                                placeholder="-- Select District --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.campaign_district && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.campaign_district.message}</p>
                                    )}
                                </div>

                                {/* Campaign Category IDs */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="campaign_category" className="block font-bold text-sm mb-1">Category</label>
                                        {categoryList?.response.length > 0 && (
                                            <button
                                                type="button"
                                                className="text-sm text-black hover:underline"
                                                onClick={handleSelectAllCategory}
                                            >
                                                Select All Categories
                                            </button>
                                        )}
                                    </div>
                                    <Controller
                                        name="campaign_category"
                                        control={control}
                                        rules={{ required: "Select Campaign Category" }}
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
                                    {errors.campaign_category && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.campaign_category.message}</p>
                                    )}
                                </div>

                                {/* Banner Language IDs */}
                                <div>

                                    <div className="flex justify-between items-center">
                                        <label htmlFor="seller_language_id" className="block font-bold text-sm mb-1">Banner Language</label>
                                        {languageList?.response.length > 0 && (
                                            <button
                                                type="button"
                                                className="text-sm text-black hover:underline"
                                                onClick={handleSelectAllLanguage}
                                            >
                                                Select All Languages
                                            </button>
                                        )}
                                    </div>
                                    <Controller
                                        name="seller_language_id"
                                        control={control}
                                        rules={{ required: "Select Campaign Category" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isMulti
                                                options={languageList?.response}
                                                placeholder="-- Select Language --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.seller_language_id && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.seller_language_id.message}</p>
                                    )}
                                </div>

                                {/* Banner Image */}
                                <div>
                                    <label htmlFor="campaign_banner" className="block font-bold text-sm mb-1">Campaign Banner</label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='brandImage'
                                        type='file'
                                        accept='image/*'
                                        {...register('campaign_banner')}
                                        onChange={handleImageChange}
                                    />
                                    {bannerPreview && (
                                        <div className="mt-3">
                                            <p className="text-sm font-medium mb-1">Preview:</p>
                                            <img
                                                src={bannerPreview}
                                                alt="Campaign Banner Preview"
                                                className="w-full max-w-xs border rounded shadow"
                                            />
                                        </div>
                                    )}
                                    {errors.campaign_banner && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.campaign_banner.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="form-submit-btn mt-5 col-span-full rounded-2xl p-5 text-center bg-whitesmoke">
                                    <button
                                        type="submit"
                                        className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                    >
                                        {editComboBannerMutation.isPending ? "Submitting..." : "Submit"}
                                    </button>
                                </div>


                            </form>
                        </div>
                }

                {editComboBannerMutation.isPending ? <Loader task="Updating Combo Banner..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
