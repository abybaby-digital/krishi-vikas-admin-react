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
import { addComboPlan, categoryWiseProductViewById, editGoodsVehiclePost, editTractorPost, fetchBannerFeatureList, fetchBoostFeatureList, fetchBrandsList, fetchCategoryList, fetchDistrictListByState, fetchModelsList, fetchPromotionTagList, fetchStateList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DataLoader from "../../../components/DataLoader";

export default function EditGoodsVehicle() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const singlePostData = JSON.parse(sessionStorage.getItem("post-data"));

    console.log(singlePostData);


    const categoryId = singlePostData?.category_id;
    const postId = singlePostData?.id;

    const [refetch, setRefetch] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    // console.log(token);




    const [imagePreviews, setImagePreviews] = useState({
        front_image: null,
        left_image: null,
        right_image: null,
        back_image: null,
        meter_image: null,
        tyre_image: null,
    });

    const handleImageChange = (e, imageType) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [imageType]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const productTypeOptions = [
        { value: "sell_new", label: "Sell New" },
        { value: "sell_old", label: "Sell Old" },
        { value: "rent_new", label: "Rent New" },
        { value: "rent_old", label: "Rent Old" },
    ];

    const commonOptions = [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
    ];

    const rentOptions = [
        {
            value: "per Month", label: "per Month"
        },
        {
            value: "per Day", label: "per Day"
        },
        {
            value: "per Hour", label: "per Hour"
        },
    ]



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

    // DISTRICT LIST
    const {
        data: districtList,
        isLoading: districtLoading,
        error: districtError,
    } = useQuery({
        queryKey: ["districtList", watch("campaign_state")],
        queryFn: () => fetchDistrictListByState(token, watch("campaign_state").map((s) => s.value).join(",")),
    });

    // BRANDS LIST
    const {
        data: brandList,
        isLoading: brandLoading,
        error: brandError,
    } = useQuery({
        queryKey: ["brandList", watch("category_id")?.value],
        queryFn: () => fetchBrandsList(token, +watch("category_id")?.value),
    });


    // MODELS LIST
    const {
        data: modelList,
        isLoading: modelLoading,
        error: modelError,
    } = useQuery({
        queryKey: ["modelList", watch("category_id")?.value, watch("brand_id")?.value],
        queryFn: () => fetchModelsList(token, +watch("category_id")?.value, +watch("brand_id")?.value),
    });

    const { data: postViewById, isLoading: postByIdLoading } = useQuery({
        queryKey: ["post-view-by-id", categoryId, postId, refetch],
        queryFn: async () => {
            return await categoryWiseProductViewById(token, categoryId, postId);
        }
    })

    useEffect(() => {
        setValue("category_id", categoryList?.response?.find(item => item.value === postViewById?.response?.category_id));
        setValue("product_type", productTypeOptions?.find(item => item.value === postViewById?.response?.product_type));
        setValue("brand_id", { value: postViewById?.response.brand_id, label: postViewById?.response.brand_name });
        setValue("model_id", { value: postViewById?.response.model_id, label: postViewById?.response.model_name });
        setValue("title", postViewById?.response?.title);
        setValue("year_of_purchase", postViewById?.response?.year_of_purchase);
        setValue("rc_available", commonOptions?.find(item => item.value === postViewById?.response?.rc_available));
        setValue("noc_available", commonOptions?.find(item => item.value === postViewById?.response?.noc_available));
        setValue("registration_no", postViewById?.response?.registration_no);
        setValue("description", postViewById?.response?.description);
        setValue("phone_no", postViewById?.response?.phone_no);
        setValue("price", postViewById?.response?.price);
        setValue("is_negotiable", commonOptions?.find(item => item.value === postViewById?.response?.is_negotiable));
        setValue("rent_type", rentOptions?.find(item => item.value === postViewById?.response?.rent_type));
        setValue("campaign_state", postViewById?.response?.selected_seller_state_name);

        setValue("campaign_district", postViewById?.response?.selected_seller_district_name);
        setImagePreviews({
            front_image: postViewById?.response.front_image || null,
            left_image: postViewById?.response.left_image || null,
            right_image: postViewById?.response.right_image || null,
            back_image: postViewById?.response.back_image || null,
            meter_image: postViewById?.response.meter_image || null,
            tyre_image: postViewById?.response.tyre_image || null,
        });
    }, [postViewById])

    const editTractorPostMutation = useMutation({
        mutationFn: async (data) => {
            return await editGoodsVehiclePost(
                token,
                singlePostData?.id,
                data.category_id?.value,
                data.product_type?.value,
                data.brand_id?.value,
                data.model_id?.value,
                data.title,
                data.year_of_purchase,
                data.rc_available?.value,
                data.noc_available?.value,
                data.registration_no,
                data.description,
                data.price,
                data.rent_type?.value,
                data.is_negotiable?.value,
                data.left_image,
                data.right_image,
                data.front_image,
                data.back_image,
                data.meter_image,
                data.tyre_image,
                data.campaign_state.map((item) => item.value).join(","),
                data.campaign_district.map((item) => item.value).join(","),
                // singlePostData?.seller_state_id,
                // singlePostData?.seller_district_id,
                data.phone_no,
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset();
                navigate("/goods-vehicle/post-list");
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error) => {
            toast.error("Failed to add combo plan. Please try again.");
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        editTractorPostMutation.mutate(data);
    };

    const handleSelectAllStates = () => {
        setValue("campaign_state", stateList?.response);
    }
    const handleSelectAllDistrict = () => {
        setValue("campaign_district", districtList?.response);
    }

    // console.log(postViewById?.response?.front_image);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Tractor" />
                {
                    postByIdLoading && districtLoading ?
                        <div className="my-10">
                            <p className="text-center mb-5">Preparing For Edit ...</p>
                            <DataLoader />
                        </div>  
                        :
                        <div className="form-wrapper bg-white p-5">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1"
                            >
                                <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 lg:col-span-3 col-span-1">
                                    <h2 className="text-2xl font-bold text-center font-dmsans">Edit Goods Vehicle Post</h2>
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category_id" className="block font-bold text-sm mb-1">Category</label>
                                    <Controller
                                        name="category_id"

                                        control={control}
                                        rules={{ required: "Select a category" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={categoryList?.response}
                                                placeholder="-- Select Category --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.category_id && <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.category_id.message}</p>}
                                </div>

                                {/* Product Type */}
                                <div className="">
                                    <label htmlFor="product_type" className="block font-bold text-sm mb-1">Product Type</label>
                                    <Controller
                                        name="product_type"
                                        control={control}
                                        rules={{ required: "Select a product type" }}

                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={productTypeOptions}
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.product_type && <p className="text-red-500 text-sm">{errors.product_type.message}</p>}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label htmlFor="brand_id" className="block font-bold text-sm mb-1">Brand</label>
                                    <Controller
                                        name="brand_id"
                                        control={control}
                                        rules={{ required: "Select a brand" }}
                                        render={({ field }) => (
                                            <Select

                                                {...field}
                                                options={brandList?.response}
                                                placeholder="-- Select Brand --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.brand_id && <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.brand_id.message}</p>}
                                </div>

                                {/* Model */}
                                <div>
                                    <label htmlFor="model_id" className="block font-bold text-sm mb-1">Model</label>
                                    <Controller
                                        name="model_id"
                                        control={control}
                                        rules={{ required: "Select a model" }}
                                        render={({ field }) => (
                                            <Select

                                                {...field}
                                                options={modelList?.response}
                                                placeholder="-- Select Model --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.model_id && <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.model_id.message}</p>}
                                </div>

                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block font-bold text-sm mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="Enter Title"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("title", { required: "Enter Title" })}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.title.message}</p>
                                    )}
                                </div>

                                {/* YOP */}
                                <div>
                                    <label htmlFor="year_of_purchase" className="block font-bold text-sm mb-1">Year of Purchase</label>
                                    <input
                                        type="number"
                                        id="year_of_purchase"
                                        placeholder="Enter Year of Purchase"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("year_of_purchase", { required: "Enter Title" })}
                                    />
                                    {errors.year_of_purchase && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.year_of_purchase.message}</p>
                                    )}
                                </div>

                                {/* RC AVAIABLE */}
                                <div>
                                    <label htmlFor="rc_available" className="block font-bold text-sm mb-1">RC Available</label>
                                    <Controller
                                        name="rc_available"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={commonOptions}
                                                placeholder="-- RC Availability --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.rc_available && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.rc_available.message}</p>
                                    )}
                                </div>

                                {/* NOC AVAIABLE */}
                                <div>
                                    <label htmlFor="noc_available" className="block font-bold text-sm mb-1">NOC Available</label>
                                    <Controller
                                        name="noc_available"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={commonOptions}
                                                placeholder="-- NOC Availability --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.noc_available && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.noc_available.message}</p>
                                    )}
                                </div>

                                {/* Registration No */}
                                <div>
                                    <label htmlFor="registration_no" className="block font-bold text-sm mb-1">Registration No</label>
                                    <input
                                        type="number"
                                        id="registration_no"
                                        placeholder="Enter Year of Purchase"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("registration_no", { required: "Enter Title" })}
                                    />
                                    {errors.registration_no && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.registration_no.message}</p>
                                    )}
                                </div>

                                {/* Product Description */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block font-bold text-sm mb-1">Product Description</label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter product description"
                                        rows={3}
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("description")}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>

                                {/* PHONE NO */}
                                <div>
                                    <label htmlFor="phone_no" className="block font-bold text-sm mb-1">Phone No</label>
                                    <input
                                        type="number"
                                        id="phone_no"
                                        disabled
                                        placeholder="Enter Phone No"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("phone_no", { required: "Enter Title" })}
                                    />
                                    {errors.phone_no && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.phone_no.message}</p>
                                    )}
                                </div>

                                {/* PRICE */}
                                <div>
                                    <label htmlFor="price" className="block font-bold text-sm mb-1">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Enter Price"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("price", { required: "Enter Title" })}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.price.message}</p>
                                    )}
                                </div>

                                {/* IS NEGOTIABLE */}
                                <div>
                                    <label htmlFor="is_negotiable" className="block font-bold text-sm mb-1">Is Negotiable</label>
                                    <Controller
                                        name="is_negotiable"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={commonOptions}
                                                placeholder="-- Select Is Negotiable --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.is_negotiable && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.is_negotiable.message}</p>
                                    )}
                                </div>

                                {/* RENT TYPE */}
                                {
                                    watch("product_type")?.value === "rent_new" ||
                                        watch("product_type")?.value === "rent_old" ?
                                        <div>
                                            <label htmlFor="rent_type" className="block font-bold text-sm mb-1">Rent Type</label>
                                            <Controller
                                                name="rent_type"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={rentOptions}
                                                        placeholder="-- Select Rent Type --"
                                                        classNamePrefix="react-select"
                                                    />
                                                )}
                                            />
                                            {errors.rent_type && (
                                                <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.rent_type.message}</p>
                                            )}
                                        </div> : null
                                }
                                {/* State IDs */}
                                <div className="col-span-full">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="campaign_state" className="block font-bold text-sm mb-1">Seller States</label>
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
                                <div className="col-span-full">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="campaign_district" className="block font-bold text-sm mb-1">Seller Districts</label>
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

                                <div className="col-span-full">
                                    {/* FRONT IMAGE */}
                                    <div>
                                        <label htmlFor="front_image" className="block font-bold text-sm mb-1">Front Image</label>
                                        <input
                                            type="file"
                                            id="front_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("front_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "front_image");
                                                console.log(e);

                                            }}
                                        />
                                        {errors.front_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.front_image.message}</p>
                                        )}
                                        {imagePreviews.front_image && (
                                            <img src={imagePreviews.front_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}
                                    </div>
                                    {/* LEFT IMAGE */}
                                    <div>
                                        <label htmlFor="left_image" className="block font-bold text-sm mb-1">Left Image</label>
                                        <input
                                            type="file"
                                            id="left_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("left_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "left_image");
                                                console.log(e);

                                            }}
                                        />
                                        {errors.left_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.left_image.message}</p>
                                        )}
                                        {imagePreviews.left_image && (
                                            <img src={imagePreviews.left_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}
                                    </div>
                                    {/* RIGHT IMAGE */}
                                    <div>
                                        <label htmlFor="right_image" className="block font-bold text-sm mb-1">Right Image</label>
                                        <input
                                            type="file"
                                            id="right_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("right_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "right_image");
                                                console.log(e);

                                            }}

                                        />
                                        {errors.right_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.right_image.message}</p>
                                        )}
                                        {imagePreviews.right_image && (
                                            <img src={imagePreviews.right_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}

                                    </div>
                                    {/* BACK IMAGE */}
                                    <div>
                                        <label htmlFor="back_image" className="block font-bold text-sm mb-1">Back Image</label>
                                        <input
                                            type="file"
                                            id="back_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("back_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "back_image");
                                                console.log(e);

                                            }}
                                        />
                                        {errors.back_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.back_image.message}</p>
                                        )}
                                        {imagePreviews.back_image && (
                                            <img src={imagePreviews.back_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}
                                    </div>
                                    {/* METER IMAGE */}
                                    <div>
                                        <label htmlFor="meter_image" className="block font-bold text-sm mb-1">Meter Image</label>
                                        <input
                                            type="file"
                                            id="meter_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("meter_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "meter_image");
                                                console.log(e);

                                            }}
                                        />
                                        {errors.meter_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.meter_image.message}</p>
                                        )}
                                        {imagePreviews.meter_image && (
                                            <img src={imagePreviews.meter_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}
                                    </div>
                                    {/* TYRE IMAGE */}
                                    <div>
                                        <label htmlFor="tyre_image" className="block font-bold text-sm mb-1">Tyre Image</label>
                                        <input
                                            type="file"
                                            id="tyre_image"
                                            placeholder="Enter Price"
                                            className="w-full border px-3 py-2 rounded"
                                            {...register("tyre_image")}
                                            onChange={(e) => {
                                                handleImageChange(e, "tyre_image");
                                                console.log(e);

                                            }}
                                        />
                                        {errors.tyre_image && (
                                            <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.tyre_image.message}</p>
                                        )}
                                        {imagePreviews.tyre_image && (
                                            <img src={imagePreviews.tyre_image} alt="Preview" className="mt-2 rounded max-h-32 object-contain border mx-auto" />
                                        )}
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <div className="form-submit-btn mt-5 xl:col-span-4 lg:col-span-3 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                                    <button
                                        type="submit"
                                        className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                    >
                                        {editTractorPostMutation.isPending ? "Submitting..." : "Update"}
                                    </button>
                                </div>


                            </form>
                        </div>
                }
                {editTractorPostMutation.isPending ? <Loader task="Editing Post..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
