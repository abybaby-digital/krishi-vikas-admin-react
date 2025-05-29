import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateMetas } from '../../../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const MetaUpdate = ({ postViewById , setModal , setSeoModal }) => {
    const token = useSelector((state) => state.auth.token);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    const updateMetaMutation = useMutation({
        mutationFn: async (payload) => {
            return await updateMetas(
                token, 
                payload.category_id,
                payload.post_id,
                payload.meta_title,
                payload.meta_description,
            );
        },
        onSuccess: (response) => {
            if (response.status === 200) {
                toast.success(response.message || "Meta updated successfully!");
                setModal(false);
                setSeoModal(false);
            } else {
                toast.error("Failed to update meta info.");
            }
        },
        onError: (err) => {
            toast.error(err.message || "An error occurred");
        }
    });

    const onSubmit = (formData) => {
        const payload = {
            category_id: postViewById?.response?.category_id,
            post_id: postViewById?.response?.id,
            meta_title: formData.meta_title,
            meta_description: formData.meta_description,
        };
        updateMetaMutation.mutate(payload);
        console.log(payload);
        
    };

    useEffect(() => {
        if (postViewById?.response) {
            setValue("meta_title", postViewById.response.meta_title || "");
            setValue("meta_description", postViewById.response.meta_description || "");
        }
    }, [postViewById, setValue]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 bg-white rounded-xl shadow-md"
        >
            <div>
                <label className="block mb-1 font-medium">Meta Title</label>
                <input
                    type="text"
                    {...register("meta_title", { required: "Meta title is required" })}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.meta_title && (
                    <p className="text-red-500 text-sm">{errors.meta_title.message}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 font-medium">Meta Description</label>
                <textarea
                    {...register("meta_description", { required: "Meta description is required" })}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {errors.meta_description && (
                    <p className="text-red-500 text-sm">{errors.meta_description.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-lightdark text-white px-6 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
                disabled={updateMetaMutation.isPending}
            >
                {updateMetaMutation.isPending ? "Saving..." : "Update Meta Info"}
            </button>
        </form>
    );
};

export default MetaUpdate;
