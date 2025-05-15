import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { CiSquareRemove } from "react-icons/ci";


const ViewComboPlan = ({ modal, setModal, singleComboData }) => {
    console.log(singleComboData);

    return (
        <>
            <Dialog open={modal}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>View Combo Plan Details</DialogTitle>
                        <hr />
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="content-dialog grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg '>Plan Name</p>
                            <p>{singleComboData?.name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Plan Price</p>
                            <p>{singleComboData?.price}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Plan Duration</p>
                            <p>{singleComboData?.price}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Banner Feature</p>
                            <p>{singleComboData?.banner_feature_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Boost Feature</p>
                            <p>{singleComboData?.boost_feature_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>No. of Boost</p>
                            <p>{singleComboData?.no_of_boost}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>No. of Product</p>
                            <p>{singleComboData?.no_of_product}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Categories</p>
                            <p>{singleComboData?.category_names}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>States</p>
                            <p>{singleComboData?.state_names}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Promotion Tags</p>
                            <p>{singleComboData?.promotional_tag_name}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Package Description</p>
                            <p>{singleComboData?.package_description}</p>
                        </div>
                    </div>
                    <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                        <button type="button" onClick={() => { setModal(false) }} >
                            <CiSquareRemove className='text-2xl' />
                        </button>
                    </DialogClose>
                </DialogContent>

            </Dialog>

        </>
    )
}

export default ViewComboPlan
