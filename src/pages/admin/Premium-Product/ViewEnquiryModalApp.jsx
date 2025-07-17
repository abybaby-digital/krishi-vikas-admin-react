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

const ViewEnquiryModalApp = ({ modal, setModal, singleEnquiry }) => {
    const formatAnswer = (question) => {
        return singleEnquiry?.premium_product_question_answer?.find(q => q.question === question)?.answer || "—";
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

    return (
        <Dialog open={modal}>
            <DialogTrigger />
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl">
                        Enquiry Details
                    </DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="content-dialog grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-5">
                    <div>
                        <p className="font-semibold text-darkGreen">Category</p>
                        <p>{singleEnquiry?.category_name || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">User Name</p>
                        <p>{singleEnquiry?.user_name || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Responser Name</p>
                        <p>{singleEnquiry?.responser_name || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Responser Phone No</p>
                        <p>{singleEnquiry?.responser_phone_no || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Responser Zipcode</p>
                        <p>{singleEnquiry?.responser_zipcode || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Brand Name</p>
                        <p>{singleEnquiry?.brand_name || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Model Name</p>
                        <p>{singleEnquiry?.model_name || "—"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Exchange Old Tractor</p>
                        <p>{formatAnswer("Exchange Old Tractor")}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Buy Time</p>
                        <p>{formatAnswer("When will you buy?")}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-darkGreen">Created At</p>
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

export default ViewEnquiryModalApp;
