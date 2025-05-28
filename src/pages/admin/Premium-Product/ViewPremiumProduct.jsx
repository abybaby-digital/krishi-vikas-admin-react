import React, { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { categoryWiseProductViewById } from '../../../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DataLoader from '../../../components/DataLoader';

const ViewPremiumProduct = ({ modal, setModal, singlePostData }) => {
    const categoryId = singlePostData?.category_id;
    const postId = singlePostData?.id;
    const token = useSelector((state) => state.auth.token);

    const { data: postViewById, isLoading: postByIdLoading } = useQuery({
        queryKey: ["post-view-by-id", categoryId, postId],
        queryFn: async () => {
            return await categoryWiseProductViewById(token, categoryId, postId);
        },
        enabled: !!categoryId && !!postId
    });

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <Dialog open={modal}>
            <DialogTrigger />
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl">
                        View Product Details
                    </DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {postByIdLoading ? (
                    <DataLoader />
                ) : (
                    <div className="content-dialog grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Post ID</p>
                            <p>{singlePostData?.id}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Category</p>
                            <p>{singlePostData?.category_id}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>User ID</p>
                            <p>{singlePostData?.user_id}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>User Name</p>
                            <p>{singlePostData?.user_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Product Type</p>
                            <p>{singlePostData?.product_type}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Brand Name</p>
                            <p>{singlePostData?.brand_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Model Name</p>
                            <p>{singlePostData?.model_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Product Price</p>
                            <p>Rs.{parseFloat(singlePostData?.product_price).toLocaleString()}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Backend Price</p>
                            <p>Rs.{parseFloat(singlePostData?.backend_price).toLocaleString()}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Boosted</p>
                            <p>{singlePostData?.is_boosted === "1" ? "Yes" : "No"}</p>
                        </div>
                        <div className="data-group border-b pb-5 col-span-2">
                            <p className='font-semibold text-darkGreen text-lg'>Description</p>
                            <p>{singlePostData?.product_description || "N/A"}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Status</p>
                            <p>
                                {singlePostData?.status === "0"
                                    ? "Pending"
                                    : singlePostData?.status === "1"
                                        ? "Approved"
                                        : "Rejected"}
                            </p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Created At</p>
                            <p>{formatDate(singlePostData?.created_at)}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Updated At</p>
                            <p>{formatDate(singlePostData?.updated_at)}</p>
                        </div>
                    </div>
                )}

                <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                    <button type="button" onClick={() => setModal(false)}>
                        <CiSquareRemove className='text-2xl' />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default ViewPremiumProduct;
