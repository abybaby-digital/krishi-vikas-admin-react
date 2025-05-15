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
import { addNotificationContent, notificationTypeList } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";

export default function AddNotificationContent() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const { data: notificationTypes } = useQuery({
        queryKey: ["notification-type-list"],
        queryFn: async () => {
            return await notificationTypeList(token);
        }
    });

    const addNotificationMutation = useMutation({
        mutationFn: async (data) => {
            return await addNotificationContent(
                token,
                data.noti_type_id.value,
                data.ln_en_title,
                data.ln_en_des,
                data.ln_bn_title,
                data.ln_bn_des,
                data.ln_hi_title,
                data.ln_hi_des,
                data.ln_gu_title,
                data.ln_gu_des,
                data.ln_kn_title,
                data.ln_kn_des,
                data.ln_ml_title,
                data.ln_ml_des,
                data.ln_mr_title,
                data.ln_mr_des,
                data.ln_or_title,
                data.ln_or_des,
                data.ln_ta_title,
                data.ln_ta_des,
                data.ln_te_title,
                data.ln_te_des,
                data.ln_pa_title,
                data.ln_pa_des,
                data.ln_as_title,
                data.ln_as_des,
                data.notification_image
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset();
                navigate("/notification/notification-content-list");
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error) => {
            toast.error("Failed to add notification content. Please try again.");
        },
    });

    const onSubmit = (data) => {
        addNotificationMutation.mutate(data);
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

                        {/* Notification Type */}
                        <div className="notification-type lg:col-span-2 col-span-1">
                            <label htmlFor="noti_type_id" className="block font-bold text-sm mb-1">Notification Type</label>
                            <Controller
                                name="noti_type_id"
                                control={control}
                                rules={{ required: "Select Notification Type" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={notificationTypes?.response}
                                        placeholder="-- Select Notification Type --"
                                        classNamePrefix="react-select"
                                    />
                                )}
                            />
                            {errors.noti_type_id && (
                                <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.noti_type_id.message}</p>
                            )}
                        </div>

                        {/* Notification Image */}
                        <div className="lg:col-span-2 col-span-1">
                            <label htmlFor="notification_image" className="block font-bold text-sm mb-1">Notification Image</label>
                            <input
                                type="file"
                                id="notification_image"
                                className="w-full border px-3 py-2 rounded"
                                {...register("notification_image", {
                                    required: "Please upload a notification image",
                                    validate: (fileList) => {
                                        if (fileList && fileList[0]) {
                                            const file = fileList[0];
                                            if (!file.type.startsWith("image/")) {
                                                return "Please upload a valid image file.";
                                            }
                                        }
                                        return true;
                                    }
                                })}
                            />
                            {errors.notification_image && (
                                <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors.notification_image.message}</p>
                            )}
                        </div>

                        {/* Language Sections */}
                        {[
                            { code: 'en', label: 'English' },
                            { code: 'bn', label: 'Bengali' },
                            { code: 'hi', label: 'Hindi' },
                            { code: 'gu', label: 'Gujarati' },
                            { code: 'kn', label: 'Kannada' },
                            { code: 'ml', label: 'Malayalam' },
                            { code: 'mr', label: 'Marathi' },
                            { code: 'or', label: 'Oriya' },
                            { code: 'ta', label: 'Tamil' },
                            { code: 'te', label: 'Telugu' },
                            { code: 'pa', label: 'Punjabi' },
                            { code: 'as', label: 'Assamese' }
                        ].map((language) => (
                            <div key={language.code} className="language-notification border border-dashed rounded-2xl p-5 relative overflow-hidden">
                                <p className="bg-gradient-green inline-block text-white absolute right-3 top-3 px-3 py-1 text-sm rounded-2xl">{language.label}</p>

                                {/* Title */}
                                <div className="mb-3 mt-6">
                                    <label htmlFor={`ln_${language.code}_title`} className="block font-bold text-sm mb-1">{`Notification ${language.label} Title`}</label>
                                    <input
                                        type="text"
                                        id={`ln_${language.code}_title`}
                                        placeholder={`Enter ${language.label} title`}
                                        className="w-full border px-3 py-2 rounded"
                                        {...register(`ln_${language.code}_title`, { required: `Enter ${language.label} Notification Title` })}
                                    />
                                    {errors[`ln_${language.code}_title`] && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors[`ln_${language.code}_title`].message}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor={`ln_${language.code}_des`} className="block font-bold text-sm mb-1">{`Notification ${language.label} Description`}</label>
                                    <input
                                        type="text"
                                        id={`ln_${language.code}_des`}
                                        placeholder={`Enter ${language.label} description`}
                                        className="w-full border px-3 py-2 rounded"
                                        {...register(`ln_${language.code}_des`, { required: `Enter ${language.label} Notification Description` })}
                                    />
                                    {errors[`ln_${language.code}_des`] && (
                                        <p className="text-red-500 mt-1"><TiWarning className="inline me-1" />{errors[`ln_${language.code}_des`].message}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="form-submit-btn mt-5 lg:col-span-2 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                            <button
                                type="submit"
                                className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                            >
                                {addNotificationMutation.isPending ? "Submitting..." : "Submit Notification"}
                            </button>
                        </div>
                    </form>
                </div>
                {addNotificationMutation.isPending ? <Loader task="Creating Notification..." /> : null}
            </SidebarInset>
        </SidebarProvider>
    );
}
