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

import toast from 'react-hot-toast';

import { editSpec, fetchSpecById } from '../../../services/api';
import DataLoader from '../../../components/DataLoader';


const EditSpec = ({ modal, setModal, refetch, setRefetch, specId }) => {


    const token = useSelector((state) => state.auth.token);

    console.log(specId);

    const [imagePreview, setImagePreview] = React.useState(null);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const { data: specViewById, isLoading: brandDetailsLoading } = useQuery({
        queryKey: ["spec-by-id", modal, specId],
        queryFn: async () => {
            return await fetchSpecById(
                token, specId
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



    const editSpecMutation = useMutation({
        mutationFn: async (data) => {
            return await editSpec(
                token,
                specId,
                data.spec_name,
                data.spec_value,
                data.spec_logo
            )
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                setRefetch(!refetch);
                reset();
                setImagePreview(null);
                setModal(false);
            }
            else {
                toast.error(response.message);
            }
        }
    })
    // console.log(errors);
    const onSubmit = async (data) => {
        console.log(data);
        editSpecMutation.mutate(data);
    }

    useEffect(() => {
        setValue("spec_name", specViewById?.response?.spec_name);
        setValue("spec_value", specViewById?.response?.value);
        setImagePreview(specViewById?.response?.spec_logo);
    }, [specId, specViewById])


    return (
        <Dialog open={modal}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl capitalize">Edit Specification</DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {

                    editSpecMutation.isPending ?
                        <div>
                            <div>
                                <DataLoader />
                                <p className='text-center'>Updating Specification ...</p>
                            </div>
                        </div>
                        :
                        brandDetailsLoading ?
                            <div>
                                <DataLoader />
                                <p className='text-center'>Preparing for edit ...</p>
                            </div>
                            :
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Name</label>
                                    <input
                                        type="text"
                                        {...register("spec_name", { required: "Spec name is required" })}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                    {errors.spec_name && (
                                        <p className="text-red-500">{errors.spec_name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Value</label>
                                    <input
                                        type="text"
                                        {...register("spec_value", { required: "Spec value is required" })}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                    {errors.spec_value && (
                                        <p className="text-red-500">{errors.spec_value.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Logo</label>
                                    <input

                                        type="file"
                                        accept="image/*"
                                        {...register("spec_logo")}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        onChange={handleImageChange}
                                    />
                                    {errors.spec_logo && (
                                        <p className="text-red-500">{errors.spec_logo.message}</p>
                                    )}

                                    {imagePreview && (
                                        <div className='my-4 text-center'>
                                            <img id='imagePreview' src={imagePreview} className='w-32 h-32 p-2 object-contain bg-white rounded-2xl shadow ' alt='Brand Preview' />
                                        </div>
                                    )}
                                </div>

                                <div className="text-center pb-5">
                                    <button
                                        type="submit"
                                        className="bg-gradient-green text-white px-4 py-2 rounded"
                                    >
                                        {
                                            editSpecMutation.isPending ?
                                                "Updating.." : "Update"
                                        }
                                    </button>
                                </div>
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

export default EditSpec;
