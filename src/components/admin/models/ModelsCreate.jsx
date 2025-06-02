import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";




import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchBrandsList } from '../../../services/api';
import { useSelector } from 'react-redux';


const ModelsCreate = ({ category }) => {
    const token = useSelector((state) => state.auth.token);

    const [imagePreview, setImagePreview] = React.useState(null);

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

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    // console.log(errors);
    const onSubmit = async (data) => {
        console.log(data);
        toast.success("Model Created Successfully 😃")
    }

    const { data: brandList } = useQuery({
        queryKey: ["brand-list", category],
        queryFn: async () => {
            return await fetchBrandsList(token, getCategoryId(category))
        }
    })

    return (
        <div className='w-full bg-white shadow p-5 rounded-2xl'>
            <p className='uppercase text-xl text-darkGreen font-semibold mb-5'>add new model</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
                    <Controller
                        control={control}
                        name="brand_id"
                        // rules={{ required: "Select state(s)" }}
                        render={({ field }) => (
                            <Select
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
                        {...register('model_logo', { required: "upload a brand icon" })}
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
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ModelsCreate
