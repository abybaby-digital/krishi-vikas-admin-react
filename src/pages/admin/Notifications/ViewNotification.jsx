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

const date = new Date();

const ViewNotification = ({ modal, setModal, singleNotification }) => {
    return (
        <Dialog open={modal}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle>View Notification Details</DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="content-dialog grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-5 h-[80vh] overflow-auto">
                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Title</p>
                        <p>{singleNotification?.title}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Description</p>
                        <p>{singleNotification?.description}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Notification Date</p>
                        <p>{singleNotification?.notification_date}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Notification Time</p>
                        <p>{singleNotification?.notification_time} Hrs</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Redirection Type</p>
                        <p>{singleNotification?.redirection_type}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Redirection URL</p>
                        <a
                            href={singleNotification?.redirection_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                        >
                            {singleNotification?.redirection_url}
                        </a>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Status</p>
                        <p>{singleNotification?.status === "1" ? "Active" : "Inactive"}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Language</p>
                        <p>{singleNotification?.language_name}</p>
                    </div>

                    <div className="data-group border-b pb-5 col-span-full">
                        <p className='font-semibold text-darkGreen text-lg'>States</p>
                        <p>{singleNotification?.state_name}</p>
                    </div>

                    <div className="data-group border-b pb-5 col-span-full">
                        <p className='font-semibold text-darkGreen text-lg'>Districts</p>
                        <p>{singleNotification?.district_name}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Open Count</p>
                        <p>{singleNotification?.open_count}</p>
                    </div>

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Created At</p>
                        <p><p>{new Date(singleNotification?.created_at).toLocaleDateString()}</p></p>
                    </div>

                    {/* <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Updated At</p>
                        <p>{singleNotification?.updated_at?.slice(0,10)}</p>
                    </div> */}

                    <div className="data-group border-b pb-5">
                        <p className='font-semibold text-darkGreen text-lg'>Notification Image</p>
                        {singleNotification?.notification_img ? (
                            <img
                                src={`/uploads/notifications/${singleNotification.notification_img}`}
                                alt="Notification"
                                className="rounded shadow w-full max-w-[200px]"
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                </div>

                <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                    <button type="button" onClick={() => { setModal(false) }}>
                        <CiSquareRemove className='text-2xl' />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default ViewNotification;
