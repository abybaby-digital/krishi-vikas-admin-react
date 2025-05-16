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

const ViewComboPlanPurchase = ({ modal, setModal, singleComboData }) => {
    return (
        <Dialog open={modal}>
            <DialogTrigger />
            <DialogContent className="p-8 max-w-5xl">
                <DialogHeader>
                    <DialogTitle>View Combo Plan Purchase Details</DialogTitle>
                    <hr />
                    <DialogDescription />
                </DialogHeader>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6 pt-4">
                    <Detail label="User Name" value={singleComboData?.user_name} />
                    <Detail label="Company Name" value={singleComboData?.company_name} />
                    <Detail label="Phone Number" value={singleComboData?.phone_no} />
                    <Detail label="Plan Name" value={singleComboData?.plan_name} />
                    <Detail label="Plan Duration" value={`${singleComboData?.plan_duration} days`} />
                    <Detail label="Start Date" value={formatDate(singleComboData?.plan_start_date)} />
                    <Detail label="End Date" value={formatDate(singleComboData?.plan_end_date)} />
                    <Detail label="Package Amount" value={`₹${parseFloat(singleComboData?.package_amount).toFixed(2)}`} />
                    <Detail label="Paid Amount" value={`₹${parseFloat(singleComboData?.customer_paid_amount).toFixed(2)}`} />
                    <Detail label="Invoice Number" value={singleComboData?.invoice_no} />
                    <Detail
                        label="Invoice Link"
                        value={
                            <a
                                href={singleComboData?.invoice_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                View Invoice
                            </a>
                        }
                    />
                    <Detail label="Status" value={singleComboData?.status === "1" ? "Active" : "Inactive"} />
                </div>

                <DialogClose asChild className="bg-white text-2xl absolute z-50 right-3 top-3">
                    <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="text-2xl text-gray-600 hover:text-red-500"
                    >
                        <CiSquareRemove />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

// Helper component for displaying a label and value
const Detail = ({ label, value }) => (
    <div className="data-group border-b pb-3">
        <p className="font-semibold text-darkGreen text-sm mb-1">{label}</p>
        <p className="text-sm">{value || "—"}</p>
    </div>
);

// Format date safely
const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
};

export default ViewComboPlanPurchase;
