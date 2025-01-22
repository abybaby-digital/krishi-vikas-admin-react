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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Link } from 'react-router-dom'

const data = {
    tractor: [
        {
            id: 1,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "tractor",
            status: 1,
        },
        {
            id: 2,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "tractor",
            status: 2,
        },
        {
            id: 3,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "tractor",
            status: 3,
        },

    ],
    goods_vehicle: [
        {
            id: 1,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "goods vehicle",
            status: 1,
        },
        {
            id: 2,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "goods vehicle",
            status: 2,
        },
        {
            id: 3,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "goods vehicle",
            status: 3,
        },

    ],
    harvester: [
        {
            id: 1,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "harvester",
            status: 1,
        },
        {
            id: 2,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "harvester",
            status: 2,
        },
        {
            id: 3,
            date: "2025-01-19 21:14:19",
            title: "Mahindra Supro Cargo Van Mini Truck",
            category: "harvester",
            status: 3,
        },

    ],

}


const LatestPostTable = () => {
    const [selectedCategory, setCategory] = useState("tractor");
    const handleSelection = (id) => {
        switch (id) {
            case "1":
                setCategory("tractor");
                break
            case "3":
                setCategory("goods_vehicle");
                break
            case "4":
                setCategory("harvester");
                break

        }
    }


    return (
        <div className="latest-post-table bg-white rounded-2xl shadow p-5 mt-5">
            <header className='flex justify-between mt-2 mb-5'>
                <p className='text-xl uppercase font-semibold text-darkGreen'>Latest Posts</p>
                <Select onValueChange={(value) => { handleSelection(value) }}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Tractor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Tractor</SelectItem>
                        <SelectItem value="3">Goods Vehicle</SelectItem>
                        <SelectItem value="4">Harvester</SelectItem>
                    </SelectContent>
                </Select>
            </header>
            <Table className="border">
                <TableHeader className="bg-[#e6e5e5] pb-2">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {data[selectedCategory]?.map((item) => (
                        <TableRow key={item.id} className="border-b capitalize">
                            <TableCell className="font-medium">{item.date}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                                <span className={`inline-block w-[100px] text-center ${item.status == 1 ? 'bg-green-600' : item.status == 2 ? 'bg-yellow-500' : 'bg-red-600'} px-2 py-1 rounded-xl text-white capitalize`}>
                                    {item.status == 1 ? "approved" : item.status == 2 ? "Pending" : "rejected"}
                                </span>
                            </TableCell>
                            <TableCell className="text-right p-2 border">
                                <Link type="button" className='border border-dashed border-black px-3 py-1 rounded-xl hover:scale-105'>View Details</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default LatestPostTable
