import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useForm, Controller } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import {
    fetchStateList,
    fetchDistrictListByState,
    addNotificationSchedule,

} from "@/services/api";

import { useState, useEffect } from "react";
import { editNotificationSchedule, fetchNotificationScheduleDataById } from "../../../services/api";

export default function EditPushNotification() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const [selectedStates, setSelectedStates] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [imagePreview, setImagePreview] = useState("");

    const {
        data: stateList,
        isLoading: stateLoading,
    } = useQuery({
        queryKey: ["stateList"],
        queryFn: () => fetchStateList(token),
    });

    const {
        data: existingNotification,
        isLoading: notificationLoading,
    } = useQuery({
        queryKey: ["notification-schedule-by-id", id],
        queryFn: () => fetchNotificationScheduleDataById(token, id),
        enabled: !!id,
    });

    console.log(existingNotification?.response.state_ids.split(",").map(Number));


    useEffect(() => {
        if (existingNotification?.response) {
            const notif = existingNotification?.response;
            reset({
                title: notif.title,
                description: notif.description,
                redirection_type: notif.redirection_type,
                language: String(notif.language_id),
                datepick: notif.notification_date,
                timepick: notif.notification_time,
                banner_id: notif.banner_id,
                category_id: notif.category_id,
                post_id: notif.post_id,
                redirection_url: notif.redirection_url,
                states: stateList?.response?.filter(item => notif?.state_ids.split(',').includes(String(item.value))),
                // states: (notif.state_ids.split(",").map(Number)).map((s) => ({ label: s.name, value: s.id })),
                districts: notif.districts?.map((d) => ({ label: d.name, value: d.id })),
            });
            setSelectedStates(notif.states?.map((s) => ({ label: s.name, value: s.id })) || []);
        }
    }, [existingNotification]);

    useEffect(() => {
        if (selectedStates.length) {
            const stateIds = selectedStates.map((s) => s.value).join(",");
            fetchDistrictListByState(token, stateIds).then((res) => {
                setDistrictOptions(res.response);
            });
        } else {
            setDistrictOptions([]);
        }
    }, [selectedStates]);

    const editPushNotificationMutation = useMutation({
        mutationFn: (data) =>
            editNotificationSchedule(
                token,
                data.title,
                data.description,
                data.redirection_type,
                data.language,
                data.states,
                data.districts,
                data.datepick,
                data.timepick,
                data.banner_id,
                data.category_id,
                data.post_id,
                data.redirection_url,
                data.image
            ),
        onSuccess: (res) => {
            if (res.success === 1) {
                toast.success("Notification Scheduled successfully!");
                reset();
                navigate("/notifications/list");
            } else {
                toast.error(res.message || "Failed to send notification.");
            }
        },
        onError: () => {
            toast.error("An error occurred. Please try again.");
        },
    });

    const onSubmit = (formData) => {
        const payload = {
            ...formData,
            language: +formData.language,
            states: formData.states?.map((s) => s.value).join(","),
            districts: formData.districts?.map((d) => d.value).join(","),
            image: formData.image?.[0],
        };

        console.log(payload);

        // editPushNotificationMutation.mutate(payload);

    };

    const handleSelectAllDistricts = () => {
        setValue("districts", districtOptions);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Edit Notification" />

                <div className="bg-white p-5">
                    {notificationLoading ?
                        <Loader task="Preparing for edit..." />
                        :
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white 2xl:w-[75%] mx-auto shadow rounded-2xl p-5 border grid gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1"
                        >
                            <div className="form-heading bg-whitesmoke rounded-2xl mb-5 p-5 xl:col-span-4 col-span-1">
                                <h2 className="text-2xl font-bold text-center font-dmsans">
                                    Edit Notification
                                </h2>
                            </div>

                            {/* Language Selection */}
                            <div className="col-span-full">
                                <label className="block font-semibold mb-2">Language</label>
                                <div className="grid lg:grid-cols-6 grid-cols-2">
                                    {["English", "Hindi", "Bengali", "Assamese", "Gujarati", "Kannada", "Malayalam", "Marathi", "Odia", "Tamil", "Telugu", "Punjabi"]
                                        .map((lang, idx) => (
                                            <label key={lang} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    value={idx + 1}
                                                    {...register("language", { required: "Select language" })}
                                                />
                                                {lang}
                                            </label>
                                        ))}
                                </div>
                                {errors.language && (
                                    <p className="text-red-500 mt-1"><TiWarning className="inline" /> {errors.language.message}</p>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="lg:col-span-2 col-span-1">
                                <label className="block font-semibold mb-1">Date</label>
                                <input type="date" {...register("datepick", { required: true })} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="lg:col-span-2 col-span-1">
                                <label className="block font-semibold mb-1">Time</label>
                                <input type="time" {...register("timepick", { required: true })} className="w-full border rounded px-3 py-2" />
                            </div>

                            {/* Title */}
                            <div className="col-span-full">
                                <label className="block font-semibold mb-1">Title</label>
                                <input type="text" {...register("title", { required: "Enter title" })} className="w-full border rounded px-3 py-2" />
                            </div>

                            {/* States */}
                            <div className="lg:col-span-2 col-span-1">
                                <label className="block font-semibold mb-1">States</label>
                                <Controller
                                    control={control}
                                    name="states"
                                    rules={{ required: "Select state(s)" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            options={stateList?.response}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setSelectedStates(value);
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {/* Districts */}
                            <div className="lg:col-span-2 col-span-1">
                                <div className="flex justify-between items-center">
                                    <label className="block font-semibold mb-1">Districts</label>
                                    {districtOptions.length > 0 && (
                                        <button
                                            type="button"
                                            className="text-sm text-black hover:underline"
                                            onClick={handleSelectAllDistricts}
                                        >
                                            Select All District
                                        </button>
                                    )}
                                </div>
                                <Controller
                                    control={control}
                                    name="districts"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            options={districtOptions}
                                            placeholder="Select districts"
                                        />
                                    )}
                                />
                            </div>

                            {/* Description */}
                            <div className="col-span-full">
                                <label className="block font-semibold mb-1">Description</label>
                                <textarea rows={4} {...register("description")} className="w-full border rounded px-3 py-2" />
                            </div>

                            {/* Redirection Type */}
                            <div className="col-span-full">
                                <label className="block font-semibold mb-1">Redirection Type</label>
                                <select {...register("redirection_type")} className="w-full border rounded px-3 py-2">
                                    <option value="">-- select --</option>
                                    <option value="banner">Banner</option>
                                    <option value="normal_product">Normal Product</option>
                                    <option value="premium_product">Premium Product</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            {/* Redirection Conditional Inputs */}
                            {watch("redirection_type") === "banner" && (
                                <div>
                                    <label className="block font-semibold mb-1">Banner ID</label>
                                    <input type="text" {...register("banner_id")} className="w-full border rounded px-3 py-2" />
                                </div>
                            )}
                            {(watch("redirection_type") === "normal_product" || watch("redirection_type") === "premium_product") && (
                                <>
                                    <div>
                                        <label className="block font-semibold mb-1">Category ID</label>
                                        <input type="text" {...register("category_id")} className="w-full border rounded px-3 py-2" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1">Post ID</label>
                                        <input type="text" {...register("post_id")} className="w-full border rounded px-3 py-2" />
                                    </div>
                                </>
                            )}
                            {watch("redirection_type") === "others" && (
                                <div>
                                    <label className="block font-semibold mb-1">Redirection URL</label>
                                    <input type="url" {...register("redirection_url")} className="w-full border rounded px-3 py-2" />
                                </div>
                            )}

                            {/* Image Upload */}
                            <div className="col-span-full">
                                <label className="block font-semibold mb-1">Add Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setImagePreview(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="block w-full"
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-3 w-40 h-auto border" />
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="form-submit-btn mt-5 xl:col-span-4 lg:col-span-3 col-span-1 rounded-2xl p-5 text-center bg-whitesmoke">
                                <button
                                    type="submit"
                                    className="bg-gradient-green text-white px-4 py-2 rounded hover:bg-[#000]"
                                >
                                    {editPushNotificationMutation.isPending ? "Updating..." : "Update Notification"
                                    }
                                </button>
                            </div>
                        </form>}

                    {editPushNotificationMutation.isPending ? <Loader task="Editing Push Notification..." /> : null}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
