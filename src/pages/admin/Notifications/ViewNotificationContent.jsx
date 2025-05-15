import React from 'react'
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

const ViewNotificationContent = ({ modal, setModal, singleComboData }) => {
    console.log(singleComboData); // You can remove this console.log later

    return (
        <>
            <Dialog open={modal}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>View Notification Content Details</DialogTitle>
                        <hr />
                        <DialogDescription>
                            {/* Description can be added if needed */}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="content-dialog h-[80vh] overflow-auto grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
                        {/* Notification Type */}
                        <div className="data-group border-b pb-5 col-span-2">
                            <p className='font-semibold text-darkGreen text-lg'>Notification Type</p>
                            <p>{singleComboData?.notification_type_name}</p>
                        </div>

                        {/* English Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>English Title</p>
                            <p>{singleComboData?.ln_en_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>English Description</p>
                            <p>{singleComboData?.ln_en_des}</p>
                        </div>

                        {/* Bengali Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Bengali Title</p>
                            <p>{singleComboData?.ln_bn_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Bengali Description</p>
                            <p>{singleComboData?.ln_bn_des}</p>
                        </div>

                        {/* Hindi Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Hindi Title</p>
                            <p>{singleComboData?.ln_hn_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Hindi Description</p>
                            <p>{singleComboData?.ln_hn_des}</p>
                        </div>

                        {/* Assamese Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Assamese Title</p>
                            <p>{singleComboData?.ln_as_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Assamese Description</p>
                            <p>{singleComboData?.ln_as_des}</p>
                        </div>

                        {/* Gujarati Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Gujarati Title</p>
                            <p>{singleComboData?.ln_gu_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Gujarati Description</p>
                            <p>{singleComboData?.ln_gu_des}</p>
                        </div>

                        {/* Kannada Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Kannada Title</p>
                            <p>{singleComboData?.ln_kn_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Kannada Description</p>
                            <p>{singleComboData?.ln_kn_des}</p>
                        </div>

                        {/* Malayalam Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Malayalam Title</p>
                            <p>{singleComboData?.ln_ml_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Malayalam Description</p>
                            <p>{singleComboData?.ln_ml_des}</p>
                        </div>

                        {/* Marathi Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Marathi Title</p>
                            <p>{singleComboData?.ln_mr_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Marathi Description</p>
                            <p>{singleComboData?.ln_mr_des}</p>
                        </div>

                        {/* Odia Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Odia Title</p>
                            <p>{singleComboData?.ln_or_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Odia Description</p>
                            <p>{singleComboData?.ln_or_des}</p>
                        </div>

                        {/* Tamil Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Tamil Title</p>
                            <p>{singleComboData?.ln_ta_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Tamil Description</p>
                            <p>{singleComboData?.ln_ta_des}</p>
                        </div>

                        {/* Telugu Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Telugu Title</p>
                            <p>{singleComboData?.ln_te_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Telugu Description</p>
                            <p>{singleComboData?.ln_te_des}</p>
                        </div>

                        {/* Punjabi Title and Description */}
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Punjabi Title</p>
                            <p>{singleComboData?.ln_pa_title}</p>
                        </div>
                        <div className="data-group border-b pb-5">
                            <p className='font-semibold text-darkGreen text-lg'>Punjabi Description</p>
                            <p>{singleComboData?.ln_pa_des}</p>
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

export default ViewNotificationContent;
