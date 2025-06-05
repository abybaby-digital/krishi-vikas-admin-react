import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from '@radix-ui/react-dialog';
import { CiSquareRemove } from "react-icons/ci";

import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import { useMutation, useQuery } from '@tanstack/react-query';
import { editBrand, editModel, fetchBrandById, fetchBrandsList, fetchModelById } from '../../services/api';
import DataLoader from '../../components/DataLoader';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';


const EditModelModal = ({ modal, setModal, category, modelId, brandId, refetchList, setRefetchList }) => {


    const token = useSelector((state) => state.auth.token);
    console.log("m", modelId);
    console.log("b", brandId);


    const [imagePreview, setImagePreview] = React.useState(null);
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    const getCategoryId = (category_name) => {
        switch (category_name) {
            case "tractor":
                return 1
            case "goods-vehicle":
                return 3
            case "harvester":
                return 4
            case "implements":
                return 5
            case "tyres":
                return 7
        }
    }
    
    const { data: modelViewById, isLoading: modelDetailsLoading } = useQuery({
        queryKey: ["model-by-cat-id", category, modelId, modal],
        queryFn: async () => {
            return await fetchModelById(
                token,
                getCategoryId(category),
                brandId,
                modelId
            );
        }
    })

    const { data: brandList, isLoading: brandLoading } = useQuery({
        queryKey: ["brand-list", category],
        queryFn: async () => {
            return await fetchBrandsList(token, getCategoryId(category))
        }
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            // console.log(imagePreview);
        } else {
            setImagePreview(null);
        }
    };

    useEffect(() => {
        setValue("brand_id", brandList?.response?.find(item => item.value === modelViewById?.response?.brand_id));
        setValue("model_name", modelViewById?.response?.model_name);
        setImagePreview(modelViewById?.response?.icon);
    }, [brandId, modelViewById])


    const editModelMutation = useMutation({
        mutationFn: async (data) => {
            return await editModel(
                token,
                modelId,
                getCategoryId(category),
                brandId,
                data.model_name,
                data.model_logo
            )
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset(); // reset the form fields
                setImagePreview(null); // reset the image preview
                setRefetchList(!refetchList);
                setModal(false);
            }
        }
    })
    // console.log(errors);
    const onSubmit = async (data) => {
        console.log(data);
        editModelMutation.mutate(data);
    }


    return (
        <Dialog open={modal}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl capitalize">Edit {category === "goods-vehicle" ? "goods vehicle" : category} Brand</DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {
                    editModelMutation.isPending ?
                        <div>
                            <div>
                                <DataLoader />
                                <p className='text-center'>Updating Brand ...</p>
                            </div>
                        </div>
                        :
                        modelDetailsLoading ?
                            <div>
                                <DataLoader />
                                <p className='text-center'>Preparing for edit ...</p>
                            </div>
                            :
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-4'>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
                                    <Controller
                                        control={control}
                                        name="brand_id"
                                        // rules={{ required: "Select state(s)" }}
                                        render={({ field }) => (
                                            <Select
                                                isDisabled={brandLoading}
                                                {...field}
                                                className='shadow border-none outline-none'
                                                options={brandList?.response}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    // setSelectedStates(value);
                                                }}
                                            />
                                        )}
                                    />
                                    <p className='text-red-500 mt-2'>{errors?.brand_id?.message}</p>
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandName'>
                                        Model Name
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='model_name'
                                        type='text'
                                        {...register('model_name', { required: "brand name required !!" })}
                                        placeholder='Enter model name'
                                    />
                                    <p className='text-red-500 mt-2'>{errors?.model_name?.message}</p>
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandImage'>
                                        Model Icon
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='model_logo'
                                        type='file'
                                        accept='image/*'
                                        {...register('model_logo')}
                                        onChange={handleImageChange}
                                    />
                                    <p className='text-red-500 mt-2'>{errors?.model_logo?.message}</p>
                                </div>
                                {imagePreview && (
                                    <div className='mb-4 text-center'>
                                        <img id='imagePreview' src={imagePreview} className='w-32 h-32 p-2 object-contain bg-white rounded-2xl shadow ' alt='Brand Preview' />
                                    </div>
                                )}
                                <button
                                    className='bg-gradient-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='submit'
                                >
                                    Update
                                </button>
                            </form>
                }

                <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                    <button type="button" onClick={() => { setModal(false); }}>
                        <CiSquareRemove className='text-2xl' />
                    </button>
                </DialogClose>

            </DialogContent>
        </Dialog>
    );
};

export default EditModelModal;
