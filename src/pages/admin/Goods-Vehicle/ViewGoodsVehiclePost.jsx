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
import { useMutation, useQuery } from '@tanstack/react-query';
import { categoryWiseProductViewById, fetchOfflineLed, postApprovalChange, uploadOfflineLead } from '../../../services/api';
import { useSelector } from 'react-redux';
import { LuIndianRupee } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";
import { MdPending } from "react-icons/md";
import { GrStatusDisabledSmall } from "react-icons/gr";
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader';
import DataLoader from '../../../components/DataLoader';
import { Skeleton } from "@/components/ui/skeleton"
import MetaUpdate from '../../../components/MetaUpdate';
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';


const ViewGoodsVehiclePost = ({ modal, setModal, singlePostData, seoModal, setSeoModal }) => {

    const categoryId = singlePostData?.category_id;
    const postId = singlePostData?.id;
    const [status, setStatus] = useState();
    const [refetch, setRefetch] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const { register, handleSubmit, reset } = useForm();

    const uploadmutation = useMutation({
        mutationFn: async (data) => {
            return await uploadOfflineLead(
                token,
                singlePostData?.category_id,
                singlePostData?.id,
                singlePostData?.user_id,
                "normal_product",
                data.import_data
            )
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                reset(); // reset the form fields
            }
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        uploadmutation.mutate(data);
    }

    const { data: offlineLeadList } = useQuery({
        queryKey: ["offline-lead-list", singlePostData?.user_id],
        queryFn: async () => {
            return await fetchOfflineLed(token, singlePostData?.user_id, null, null);
        },
        enabled: modal
    })

    console.log(offlineLeadList);

    const { data: postViewById, isLoading: postByIdLoading } = useQuery({
        queryKey: ["post-view-by-id", categoryId, postId, refetch, modal],
        queryFn: async () => {
            return await categoryWiseProductViewById(token, categoryId, postId);
        }
    })

    const changeApprovalPostMutation = useMutation({
        mutationFn: async ({ category_id, post_id, status }) => {
            return await postApprovalChange(token, category_id, post_id, status);
        },
        onSuccess: (response) => {
            if (response.status === 200) {
                toast.success("Approval Changed Successfully !!!");
                setRefetch(!refetch);
            } else {
                toast.error("Failed to change approval status.");
            }
        },
        onError: () => {
            toast.error("Error while updating approval status.");
        }
    });

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'Name',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Phone No',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'Pincode',
            selector: row => (row.zipcode),
        },

    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                backgroundColor: '#f4f5f7',
                color: '#333',
                fontSize: '14px',
                paddingTop: '12px',
                paddingBottom: '12px',
                textTransform: 'uppercase',
            },
        },
    };

    return (
        <Dialog open={modal}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="p-8">
                <DialogHeader>
                    <DialogTitle className="bg-whitesmoke text-center p-3 font-dmsans rounded-xl">View Goods Vehicle Post Details</DialogTitle>
                    <hr />
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {
                    postByIdLoading ?
                        <DataLoader />
                        :

                        seoModal ?
                            <MetaUpdate postViewById={postViewById} setModal={setModal} setSeoModal={setSeoModal} />
                            :
                            <div className="max-h-[80vh] overflow-y-auto py-4">
                                <div className="content-dialog overflow-hidden grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="actions-post bg-whitesmoke col-span-full flex justify-between p-3">
                                        <div className="approval-action flex items-center gap-2">
                                            <p className='font-dmsans'>Change Approval :</p>
                                            <select
                                                className='w-[200px] px-3 py-1 border border-dashed rounded-2xl'
                                                onChange={(e) => {
                                                    const selectedStatus = e.target.value;
                                                    setStatus(selectedStatus);
                                                    changeApprovalPostMutation.mutate({
                                                        category_id: categoryId,
                                                        post_id: postId,
                                                        status: selectedStatus
                                                    });
                                                }}
                                            >
                                                <option value="#" disabled selected>Select</option>
                                                <option value="0">Pending</option>
                                                <option value="1">Approved</option>
                                                <option value="2">Rejected</option>
                                                <option value="3">Disabled</option>
                                            </select>

                                        </div>
                                        <div className="approval-action flex items-center gap-2">
                                            <p className='font-dmsans'>Post Status :</p>

                                            {
                                                changeApprovalPostMutation.isPending ?
                                                    <Skeleton className="h-7 w-[110px] rounded-2xl" />
                                                    :
                                                    postViewById?.response.status === "0" ?
                                                        <span className='bg-orange-500  text-white rounded-full inline-block pe-5'><MdPending className='inline p-2 text-3xl' />Pending</span> :
                                                        postViewById?.response.status === "1" ?
                                                            <span className='bg-green-500  text-white rounded-full inline-block pe-5'><SiTicktick className='inline p-2 text-3xl' />Approved</span> :
                                                            postViewById?.response.status === "2" ?
                                                                <span className='bg-red-500  text-white rounded-full inline-block pe-5'><ImCancelCircle className='inline p-2 text-3xl' />Rejected</span> :
                                                                <span className='bg-black  text-white rounded-full inline-block pe-5'><GrStatusDisabledSmall className='inline p-2 text-3xl' />Disabled</span>
                                            }

                                        </div>

                                    </div>

                                    <div className="left-post-data rounded-2xl overflow-hidden shadow">
                                        <table className='w-full border border-collapse text-center'>
                                            {postViewById?.response.user_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>UserName</td>
                                                <td className='border p-2 font-bold'>{postViewById?.response.user_name}</td>
                                            </tr>}

                                            {postViewById?.response.phone_no && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Phone Number</td>
                                                <td className='border p-2 font-bold'>{postViewById?.response.phone_no}</td>
                                            </tr>}
                                            {postViewById?.response.title && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Title</td>
                                                <td className='border p-2 font-bold'>{postViewById?.response.title}</td>
                                            </tr>}
                                            {postViewById?.response.meta_title && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Meta Title</td>
                                                <td className='border p-2 font-bold'>{postViewById?.response.meta_title}</td>
                                            </tr>}
                                            {postViewById?.response.meta_description && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Meta Description</td>
                                                <td className='border p-2 font-bold'>{postViewById?.response.meta_description}</td>
                                            </tr>}
                                            {postViewById?.response.set_sell_or_rent && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Sell or Rent</td>
                                                <td className='border p-2'>{postViewById?.response.set_sell_or_rent}</td>
                                            </tr>}
                                            {postViewById?.response.type_new_or_old && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Type Old or New</td>
                                                <td className='border p-2'>{postViewById?.response.type_new_or_old}</td>
                                            </tr>}
                                            {postViewById?.response.brand_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Brand Name</td>
                                                <td className='border p-2'>{postViewById?.response.brand_name}</td>
                                            </tr>}
                                            {postViewById?.response.model_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Model Name</td>
                                                <td className='border p-2'>{postViewById?.response.model_name}</td>
                                            </tr>}
                                            {postViewById?.response.year_of_purchase && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Year of purchase</td>
                                                <td className='border p-2'>{postViewById?.response.year_of_purchase}</td>
                                            </tr>}
                                            {postViewById?.response.registration_no && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Registration No</td>
                                                <td className='border p-2'>{postViewById?.response.registration_no}</td>
                                            </tr>}
                                            {postViewById?.response.price && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Price</td>
                                                <td className='border p-2 font-bold'><LuIndianRupee className='inline' /> {`${postViewById?.response.price} ${postViewById?.response.set_sell_or_rent === "rent" ? postViewById.response.rent_type : ""}`}</td>
                                            </tr>}
                                            {postViewById?.response.address && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Address</td>
                                                <td className='border p-2'>{postViewById?.response.address}</td>
                                            </tr>}
                                            {postViewById?.response.district_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>District</td>
                                                <td className='border p-2'>{postViewById?.response.district_name}</td>
                                            </tr>}
                                            {postViewById?.response.seller_district_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Seller District</td>
                                                <td className='border p-2'>{postViewById?.response.seller_district_name}</td>
                                            </tr>}
                                            {postViewById?.response.seller_state_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Seller State</td>
                                                <td className='border p-2'>{postViewById?.response.seller_state_name}</td>
                                            </tr>}
                                            {postViewById?.response.state_name && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>State</td>
                                                <td className='border p-2'>{postViewById?.response.state_name}</td>
                                            </tr>}
                                            {postViewById?.response.pincode && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Pincode</td>
                                                <td className='border p-2'>{postViewById?.response.pincode}</td>
                                            </tr>}
                                            {postViewById?.response.description && <tr className='border'>
                                                <td className='border bg-lightdark p-2 text-white'>Description</td>
                                                <td className='border p-2'>{postViewById?.response.description}</td>
                                            </tr>}
                                        </table>
                                    </div>
                                    <div className="right-post-data rounded-2xl overflow-hidden shadow">
                                        <div className="post-images p-3 grid grid-cols-3 gap-2">
                                            {postViewById?.response.front_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.front_image} data-fancybox="postImages" data-caption="Front Image">
                                                    <img src={postViewById?.response.front_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Front Image</p>
                                            </div>}

                                            {postViewById?.response.back_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.back_image} data-fancybox="postImages" data-caption="Back Image">
                                                    <img src={postViewById?.response.back_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Back Image</p>
                                            </div>}

                                            {postViewById?.response.left_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.left_image} data-fancybox="postImages" data-caption="Left Image">
                                                    <img src={postViewById?.response.left_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Left Image</p>
                                            </div>}

                                            {postViewById?.response.right_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.right_image} data-fancybox="postImages" data-caption="Right Image">
                                                    <img src={postViewById?.response.right_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Right Image</p>
                                            </div>}

                                            {postViewById?.response.meter_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.meter_image} data-fancybox="postImages" data-caption="Meter Image">
                                                    <img src={postViewById?.response.meter_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Meter Image</p>
                                            </div>}

                                            {postViewById?.response.tyre_image && <div className='shadow rounded-xl border border-dashed p-1'>
                                                <a href={postViewById?.response.tyre_image} data-fancybox="postImages" data-caption="Tyre Image">
                                                    <img src={postViewById?.response.tyre_image} alt="image" className='object-cover h-[150px] w-full rounded-xl' />
                                                </a>

                                                <p className='text-center'>Tyre Image</p>
                                            </div>}

                                        </div>

                                        <div className="other-info p-3 flex gap-2 justify-center flex-wrap shadow rounded-2xl m-2">
                                            <div className="rc_available flex items-center gap-2 shadow p-2 rounded-xl">
                                                <p>RC Available</p>
                                                {
                                                    postViewById?.response.rc_available ?
                                                        <SiTicktick className='bg-green-500 p-2 text-3xl text-white rounded-full' /> : <ImCancelCircle className='bg-red-500 p-2 text-3xl text-white rounded-full' />
                                                }
                                            </div>
                                            <div className="noc_available flex items-center gap-2 shadow p-2 rounded-xl">
                                                <p>NOC Available</p>
                                                {
                                                    postViewById?.response.noc_available ?
                                                        <SiTicktick className='bg-green-500 p-2 text-3xl text-white rounded-full' /> : <ImCancelCircle className='bg-red-500 p-2 text-3xl text-white rounded-full' />
                                                }
                                            </div>
                                            <div className="is_negotiable flex items-center gap-2 shadow p-2 rounded-xl">
                                                <p>Price Negotiable</p>
                                                {
                                                    postViewById?.response.is_negotiable ?
                                                        <SiTicktick className='bg-green-500 p-2 text-3xl text-white rounded-full' /> : <ImCancelCircle className='bg-red-500 p-2 text-3xl text-white rounded-full' />
                                                }
                                            </div>
                                        </div>
                                        <div className="import-offline-lead rounded-2xl overflow-hidden shadow m-2">
                                            <div className="flex flex-col space-y-2">
                                                <form
                                                    onSubmit={handleSubmit(onSubmit)}
                                                    className="p-4 rounded max-w-md mx-auto bg-white"
                                                >
                                                    <label className="font-medium block mb-2">Upload Excel File</label>
                                                    <input
                                                        type="file"
                                                        accept=".xlsx,.xls"
                                                        {...register('import_data', { required: true })}
                                                        className="border p-2 rounded w-full"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={uploadmutation.isPending}
                                                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                    >
                                                        {uploadmutation.isPending ? 'Uploading...' : 'Upload'}
                                                    </button>
                                                </form>

                                            </div>
                                        </div>

                                        <div className="offline-lead-list rounded-2xl overflow-hidden shadow m-2">
                                            <h2 className='font-dmsans text-xl font-bold my-2 bg-gray-200 p-2 text-center'>Offline Lead List</h2>
                                            <DataTable
                                                columns={columns}
                                                data={offlineLeadList?.response || []}
                                                pagination
                                                striped
                                                highlightOnHover
                                                responsive
                                                customStyles={customStyles}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                }

                <DialogClose asChild className='bg-white text-2xl absolute z-50 right-3 top-3'>
                    <button type="button" onClick={() => { setModal(false); setSeoModal(false); }}>
                        <CiSquareRemove className='text-2xl' />
                    </button>
                </DialogClose>

            </DialogContent>
        </Dialog>
    );
};

export default ViewGoodsVehiclePost;
