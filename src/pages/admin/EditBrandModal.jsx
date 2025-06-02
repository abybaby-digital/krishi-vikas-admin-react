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
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editBrand, fetchBrandById } from '../../services/api';
import DataLoader from '../../components/DataLoader';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';


const EditBrandModal = ({ modal, setModal, category, brandId, refetchList, setRefetchList }) => {


    const token = useSelector((state) => state.auth.token);
    console.log(brandId);


    const [imagePreview, setImagePreview] = React.useState(null);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
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
    const { data: brandViewById, isLoading: brandDetailsLoading } = useQuery({
        queryKey: ["brand-by-cat-id", category, brandId , modal],
        queryFn: async () => {
            return await fetchBrandById(
                token,
                getCategoryId(category),
                brandId
            );
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
        setValue("brandname", brandViewById?.response?.name);
        setImagePreview(brandViewById?.response?.logo);
    }, [brandId, brandViewById])


    const editBrandMutation = useMutation({
        mutationFn: async (data) => {
            return await editBrand(
                token,
                brandId,
                getCategoryId(category),
                data.brandname,
                data.brandicon
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
        editBrandMutation.mutate(data);
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

                    editBrandMutation.isPending ?
                    <div>
                        <div>
                            <DataLoader />
                            <p className='text-center'>Updating Brand ...</p>
                        </div>
                    </div>
                    :
                    brandDetailsLoading ?
                        <div>
                            <DataLoader />
                            <p className='text-center'>Preparing for edit ...</p>
                        </div>
                        :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandName'>
                                    Brand Name
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='brandName'
                                    type='text'
                                    {...register('brandname', { required: "brand name required !!" })}
                                    placeholder='Enter brand name'
                                />
                                <p className='text-red-500 mt-2'>{errors?.brandname?.message}</p>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandImage'>
                                    Brand Icon
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='brandImage'
                                    type='file'
                                    accept='image/*'
                                    {...register('brandicon')}
                                    onChange={handleImageChange}
                                />
                                <p className='text-red-500 mt-2'>{errors?.brandicon?.message}</p>
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

export default EditBrandModal;
