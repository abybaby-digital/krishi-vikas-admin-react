import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


const BrandsCreate = () => {

    const [imagePreview, setImagePreview] = React.useState(null);

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

    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);
    const onSubmit = async(data) => {
        console.log(data);
        toast.success("Brand Created Successfully 😃")
    }
    
    return (
        <div className='w-full bg-white shadow p-5 rounded-2xl'>
            <p className='uppercase text-xl text-darkGreen font-semibold mb-5'>add new brand</p>
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
                        {...register('brandicon', { required: "upload a brand icon" })}
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
                    Submit
                </button>
            </form>
        </div>
    )
}

export default BrandsCreate
