import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { useMemo, useState } from "react"

import { MdEditDocument } from "react-icons/md"
import AdminHeader from "../../../components/admin/AdminHeader"
import { useForm } from "react-hook-form"
import { addSpec, fetchSpecListAll } from "../../../services/api"
import toast from "react-hot-toast"
import DataLoader from "../../../components/DataLoader"
import EditSpec from "./EditSpec"


export default function AddSpec() {

    const { id } = useParams();





    const token = useSelector((state) => state.auth.token);
    const [refetch, setRefetch] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [modal, setModal] = useState(false);
    const [specId, setSpecId] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                // console.log(e.target.result);
            };
            reader.readAsDataURL(file);
            // console.log(imagePreview);
        } else {
            setImagePreview(null);
        }
    };

    // SPEC LIST
    const {
        data: specList,
        isLoading: specLoading,
        error: specError,
    } = useQuery({
        queryKey: ["spec-list", id, refetch],
        queryFn: () => fetchSpecListAll(token, +id),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const addSpecMutation = useMutation({
        mutationFn: async (data) => {
            return await addSpec(
                token,
                +id,
                data.spec_name,
                data.spec_value,
                data.spec_logo
            )
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success(response.message);
                setRefetch(!refetch);
                reset();
                setImagePreview(null);
            }
            else {
                toast.error(response.message);
            }
        }
    })

    const onSubmit = (data) => {
        // File object will be in data.spec_logo[0]
        console.log("Form data ready to submit:", data);
        addSpecMutation.mutate(data);
        // You can use fetch/axios here to send `formData` to backend
    };

    // console.log(imagePreview ? imagePreview : null);


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="Models Specification" />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-5  bg-whitesmoke">
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-[400px,1fr] grid-cols-1  rounded-2xl p-5 bg-white shadow">


                        <div className="bg-white rounded-2xl shadow overflow-hidden p-2 ">
                            <div className="px-5">
                                <p className="my-3 uppercase text-center font-bold text-darkGreen text-xl">Add Specifications</p>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Name</label>
                                        <input
                                            type="text"
                                            {...register("spec_name", { required: "Spec name is required" })}
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        />
                                        {errors.spec_name && (
                                            <p className="text-red-500">{errors.spec_name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Value</label>
                                        <input
                                            type="text"
                                            {...register("spec_value", { required: "Spec value is required" })}
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        />
                                        {errors.spec_value && (
                                            <p className="text-red-500">{errors.spec_value.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>Specification Logo</label>
                                        <input

                                            type="file"
                                            accept="image/*"
                                            {...register("spec_logo", { required: "Logo is required" })}
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            onChange={handleImageChange}
                                        />
                                        {errors.spec_logo && (
                                            <p className="text-red-500">{errors.spec_logo.message}</p>
                                        )}

                                        {imagePreview && (
                                            <div className='my-4 text-center'>
                                                <img id='imagePreview' src={imagePreview} className='w-32 h-32 p-2 object-contain bg-white rounded-2xl shadow ' alt='Brand Preview' />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center pb-5">
                                        <button
                                            type="submit"
                                            className="bg-gradient-green text-white px-4 py-2 rounded"
                                        >
                                            {
                                                addSpecMutation.isPending ?
                                                    "Adding.." : "Add"
                                            }
                                        </button>
                                    </div>
                                </form>

                            </div>


                        </div>
                        <div className="bg-white rounded-2xl shadow overflow-hidden p-2 ">
                            <div className="px-5">
                                <p className="my-3 text-xl uppercase text-center font-bold text-darkGreen">Specifications List</p>
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">#</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">Action</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">Spec Name</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">Value</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">Logo</th>

                                        </tr>
                                    </thead>
                                    {
                                        specLoading ?
                                            <tr className="text-center my-5" colSpan="5">
                                                <DataLoader />
                                            </tr>
                                            :
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {specList?.response?.map((item, index) => (
                                                    <tr key={item.id} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                                                        <td className="px-4 py-2">{index + 1}</td>
                                                        <td className="px-4 py-2">
                                                            <button
                                                                className="bg-white shadow rounded-lg p-2 hover:scale-90 me-2"
                                                                onClick={() => {
                                                                    setModal(true);
                                                                    setSpecId(item.id);

                                                                }}
                                                            >
                                                                <MdEditDocument />
                                                            </button>
                                                        </td>
                                                        <td className="px-4 py-2">{item.spec_name}</td>
                                                        <td className="px-4 py-2">{item.value}</td>
                                                        <td className="px-4 py-2">
                                                            {item.spec_logo ? (
                                                                <img
                                                                    src={item.spec_logo}
                                                                    alt="logo"
                                                                    className="h-10 w-10 object-contain border rounded"
                                                                />
                                                            ) : (
                                                                <span className="text-gray-400 italic">No Image</span>
                                                            )}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                    }
                                </table>
                            </div>


                        </div>


                    </div>

                </div>

                {/* EDIT BRAND MODAL */}

                <EditSpec modal={modal} refetch={refetch} setRefetch={setRefetch} setModal={setModal} id={id} specId={specId} />

            </SidebarInset>
        </SidebarProvider>
    )
}
