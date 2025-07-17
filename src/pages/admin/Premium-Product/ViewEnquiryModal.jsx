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

const ViewEnquiryModal = ({ modal, setModal, singleEnquiry }) => {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };
    // console.log(singleEnquiry);

    const getAnswer = (key) =>
        singleEnquiry?.premium_product_question_answer?.find(q => q.question === key)?.answer || "—";

    return (
        <Dialog open={modal}>
            <DialogTrigger />
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl">
                        View Enquiry Details
                    </DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="content-dialog grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5">
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Post ID</p>
                        <p>{singleEnquiry?.id}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Brand</p>
                        <p>{singleEnquiry?.brand_name || "—"}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Model</p>
                        <p>{singleEnquiry?.model_name || "—"}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>User Name</p>
                        <p>{getAnswer("Name")}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Phone No</p>
                        <p>{getAnswer("Phone No")}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Pincode</p>
                        <p>{getAnswer("Pincode")}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Exchange Old Tractor</p>
                        <p>{getAnswer("Exchange Old Tractor")}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Buy Time</p>
                        <p>{getAnswer("When will you buy?")}</p>
                    </div>
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Created At</p>
                        <p>{formatDate(singleEnquiry?.created_at)}</p>
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

export default ViewEnquiryModal;
