import React from 'react';
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

const ViewComboBanner = ({ modal, setModal, singleComboData }) => {
    return (
        <Dialog open={modal}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="p-8 max-w-5xl">
                <DialogHeader>
                    <DialogTitle>View Combo Banner Details</DialogTitle>
                    <hr />
                    <DialogDescription />
                </DialogHeader>

                <div className="content-dialog grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Campaign Name</p>
                        <p>{singleComboData?.campaign_name}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Combo Plan</p>
                        <p>{singleComboData?.combo_plan_name}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>User</p>
                        <p>{singleComboData?.user_name}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Category</p>
                        <p>{singleComboData?.campaign_category_name}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Language</p>
                        <p>{singleComboData?.campaign_language}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>State</p>
                        <p>{singleComboData?.state_name || "All States"}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Start Date</p>
                        <p>{new Date(singleComboData?.banner_start_date).toLocaleDateString()}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>End Date</p>
                        <p>{new Date(singleComboData?.banner_end_date).toLocaleDateString()}</p>
                    </div>

                    <div className="data-group col-span-full border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Banner Image</p>
                        <img
                            src={singleComboData?.campaign_banner}
                            alt="Campaign Banner"
                            className="w-full max-w-md rounded-lg"
                        />
                    </div>
                </div>

                <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                    <button type="button" onClick={() => setModal(false)}>
                        <CiSquareRemove className='text-2xl' />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default ViewComboBanner;
