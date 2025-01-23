import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


import { Link, useParams } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog';

const ModelsTable = () => {

    const { category } = useParams();

    const [brands, setBrands] = useState([
        {
            id: 1,
            brand_icon: "https://krishivikas.com/storage/images/brands/mahindra.png",
            brand_name: "Mahindra"
        },
        {
            id: 2,
            brand_icon: "https://krishivikas.com/storage/images/brands/2023-06-26-13-35-5271712017-logo-Tata-Motors.jpg",
            brand_name: "Tata Motors"
        },
        {
            id: 3,
            brand_icon: "https://krishivikas.com/storage/images/brands/2023-01-15-04-15-357559Piaggio-Logo-1.png",
            brand_name: "Piaggio"
        },
    ]);

    const [imagePreview, setImagePreview ] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const [dialogOpen, setDialog] = useState(false);
    const [updateBrand, setUpdateBrand] = useState({});

    console.log(updateBrand);

    return (
        <div className="latest-post-table bg-white rounded-2xl shadow p-5">
            <header className='flex justify-between mt-2 mb-5'>
                <p className='text-xl uppercase font-semibold text-darkGreen'>{category}{" "}Models</p>
            </header>
            <Table className="border">
                <TableHeader className="bg-[#e6e5e5] pb-2">
                    <TableRow>
                        <TableHead>Sl No</TableHead>
                        <TableHead>Model Icon</TableHead>
                        <TableHead>Model Name</TableHead>
                        <TableHead>Brand Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {brands.map((item, idx) => (
                        <TableRow key={item.id} className="border-b capitalize">
                            <TableCell className="font-medium">{idx + 1}</TableCell>
                            <TableCell>
                                <img src={item.brand_icon} alt="brand-icon" className='w-[60px] aspect-square p-2 bg-white rounded-2xl object-contain shadow' />
                            </TableCell>
                            <TableCell>{item.brand_name}</TableCell>
                            <TableCell>{item.brand_name}</TableCell>
                            <TableCell>
                                {/* EDIT */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-white p-2 rounded shadow me-1 text-orange-500" onClick={() => { setDialog(true); setUpdateBrand(item) }}><MdEditSquare /></TooltipTrigger>
                                        <TooltipContent >
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {/* DELETE */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-white p-2 rounded shadow text-red-600"><FaTrash /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>



            <Dialog open={dialogOpen}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent className="p-5">
                    <DialogHeader>
                        <DialogTitle className='uppercase text-xl text-darkGreen font-semibold mb-5'>update brand</DialogTitle>
                        <DialogClose asChild className='absolute right-2 top-0 z-10'>
                            <button
                                className='bg-white text-black rounded-xl hover:bg-whitesmoke font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                                type='button'
                                onClick={() => { setDialog(false); setUpdateBrand({}) }}
                            >
                                <RxCross2 />
                            </button>
                        </DialogClose>
                        <DialogDescription>
                            <div className='w-full bg-white rounded-2xl'>

                                <form action="#">
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandName'>
                                            Brand Name
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='brandName'
                                            type='text'
                                            placeholder='Enter brand name'
                                            // value={updateBrand?.brand_name}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brandImage'>
                                            Brand Icon
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='brandImage'
                                            type='file'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <div className='mb-4 text-center'>
                                        <img id='imagePreview' src={imagePreview} className='w-32 h-32 p-2 object-contain bg-white rounded-2xl shadow ' alt='Brand Preview' />
                                    </div>

                                    <button
                                        className='bg-gradient-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                        type='button'
                                        onClick={() => { setDialog(false) }}
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ModelsTable
