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
import { addComboBanner, addPremiumProduct, editPremiumProduct, fetchBrandsList, fetchCategoryList, fetchLanguageList, fetchModelsList, fetchPremiumProductById, fetchStateList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import DataLoader from "../../../components/DataLoader";

export default function EditPremiumProduct() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    // STATE LIST
    const {
        data: stateList,
        isLoading: stateLoading,
        error: stateError,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
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

    // LANGUAGE LIST
    const {
        data: languageList,
        isLoading: languageLoading,
        error: languageError,
    } = useQuery({
        queryKey: ["languageList"],
        queryFn: () => fetchLanguageList(token),
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

    // PREMIUM PRODUCT VIEW BY ID

    const { data: premiumProductById, isLoading: premiumProductLoading } = useQuery({
        queryKey: ["premium-product-by-id", id],
        queryFn: async () => {
            return await fetchPremiumProductById(token, id)
        }
    })


    const editPremiumProductMutation = useMutation({
        mutationFn: async (data) => {
            return await editPremiumProduct(
                token,
                id,
                data.product_description,
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset();
                navigate("/premium-product/product-list");
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
        editPremiumProductMutation.mutate(data);
        console.log(data);
    };


    useEffect(() => {

        setValue("category_id", categoryList?.response?.find((item) => item.value === premiumProductById?.response?.category_id));
        setValue("product_type", { value: "sell_new", label: "Sell New" });
        setValue("brand_id", { value: premiumProductById?.response?.brand_id, label: premiumProductById?.response?.brand_name })
        setValue("model_id", { value: premiumProductById?.response?.model_id, label: premiumProductById?.response?.model_name })
        setValue("phone_no", premiumProductById?.response?.phone_no);
        setValue("product_description", premiumProductById?.response?.product_description);
        setValue("product_price", premiumProductById?.response?.product_price);
        setValue("price", premiumProductById?.response?.price);

    }, [premiumProductLoading, brandLoading, modelLoading, categoryLoading])

    console.log(categoryList?.response.find(item => item.value === premiumProductById?.response?.category_id));
    // console.log(premiumProductById?.response?.category_id);
    console.log("cat", watch("category_id"));


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Premium Product" />

                {
                    premiumProductLoading ?
                        <div className="my-10">
                            <p className="text-center mb-5">Preparing For Edit ...</p>
                            <DataLoader />
                        </div>
                        :
                        <div className="form-wrapper bg-white p-5">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid md:grid-cols-2 grid-cols-1 gap-3"
                            >
                                <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 col-span-full">
                                    <h2 className="text-2xl font-bold text-center font-dmsans">Edit Premium Product</h2>
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
                                                isDisabled
                                                {...field}
                                                options={categoryList?.response}
                                                placeholder="-- Select Category --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
                                </div>

                                {/* Product Type */}
                                <div className="hidden">
                                    <label htmlFor="product_type" className="block font-bold text-sm mb-1">Product Type</label>
                                    <Controller
                                        name="product_type"
                                        control={control}
                                        rules={{ required: "Select a product type" }}
                                        defaultValue={{ value: "sell_new", label: "Sell New" }}
                                        render={({ field }) => (
                                            <Select
                                                isDisabled
                                                {...field}
                                                options={[
                                                    { value: "sell_new", label: "Sell New" },
                                                    { value: "sell_old", label: "Sell Old" }
                                                ]}
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
                                                isDisabled
                                                {...field}
                                                options={brandList?.response}
                                                placeholder="-- Select Brand --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.brand_id && <p className="text-red-500 text-sm">{errors.brand_id.message}</p>}
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
                                                isDisabled
                                                {...field}
                                                options={modelList?.response}
                                                placeholder="-- Select Model --"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    {errors.model_id && <p className="text-red-500 text-sm">{errors.model_id.message}</p>}
                                </div>

                                {/* Phone No */}
                                <div>
                                    <label htmlFor="phone_no" className="block font-bold text-sm mb-1">Phone No</label>
                                    <input
                                        type="tel"
                                        disabled
                                        id="phone_no"
                                        placeholder="Enter Phone No"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("phone_no", {
                                            required: "Enter Phone No",
                                            pattern: {
                                                value: /^[0-9]{10,14}$/,
                                                message: "Enter a valid phone number"
                                            }
                                        })}
                                    />
                                    {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no.message}</p>}
                                </div>

                                {/* Product Description */}
                                <div className="col-span-full">
                                    <label htmlFor="product_description" className="block font-bold text-sm mb-1">Product Description</label>
                                    <textarea
                                        id="product_description"
                                        placeholder="Enter product description"
                                        rows={4}
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("product_description")}
                                    />
                                    {errors.product_description && <p className="text-red-500 text-sm">{errors.product_description.message}</p>}
                                </div>

                                {/* Product Price */}
                                <div>
                                    <label htmlFor="product_price" className="block font-bold text-sm mb-1">Product Price</label>
                                    <input
                                        type="number"
                                        disabled
                                        id="product_price"
                                        placeholder="Enter Product Price"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("product_price", {
                                            min: { value: 1, message: "Price must be greater than zero" }
                                        })}
                                    />
                                    {errors.product_price && <p className="text-red-500 text-sm">{errors.product_price.message}</p>}
                                </div>



                                {/* Backend Price */}
                                <div>
                                    <label htmlFor="price" className="block font-bold text-sm mb-1">Price</label>
                                    <input
                                        disabled
                                        type="number"
                                        id="price"
                                        placeholder="Enter price"
                                        className="w-full border px-3 py-2 rounded"
                                        {...register("price", {
                                            min: { value: 1, message: "Price must be greater than zero" }
                                        })}
                                    />
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="form-submit-btn mt-5 col-span-full rounded-2xl p-5 text-center bg-whitesmoke">
                                    <button
                                        type="submit"
                                        className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                    >
                                        {editPremiumProductMutation.isPending ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>

                        </div>
                }
                {editPremiumProductMutation.isPending ? <Loader task="Editing Premium Product..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
