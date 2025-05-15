import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { BiSolidUserCircle } from "react-icons/bi";
import { TiUser } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/Auth/AuthSlice';
import { FaIdCardClip } from "react-icons/fa6";

const AdminHeader = ({ head_text }) => {

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.auth.user);
    // console.log(user);
    
    return (
        <>
            <header className="flex h-16 shadow-lg border-b shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    {/* <SidebarTrigger className="-ml-1" /> */}
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block text-xl">
                                <BreadcrumbLink href="#">
                                    {head_text}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                            {/* <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem> */}

                        </BreadcrumbList>

                    </Breadcrumb>
                </div>
                <div className="profile relative">
                    <div className="profile-area mx-5 flex justify-center items-center gap-1 border border-dashed p-2 rounded-xl">
                        <BiSolidUserCircle className="text-2xl" /> {`${user?.first_name} ${user?.last_name}`}
                    </div>
                    <div className="profile-dropdown absolute w-[200px] z-10 text-center right-5">
                        <ul className="bg-white mt-2 p-3 rounded-md shadow">
                            <li className='my-2 cursor-pointer'>
                                <FaIdCardClip className="inline me-1 mb-1" />{user?.role}</li>
                            <hr />
                            <li className='my-2 cursor-pointer'>
                                <TiUser className="inline me-1 mb-1" />{`${user?.first_name} ${user?.last_name}`}</li>
                            <hr />
                            <li className='my-2 cursor-pointer' onClick={() => { dispatch(logout()) }}>
                                <IoLogOut className="inline me-1 mb-1" />
                                Logout
                            </li>
                            

                        </ul>
                    </div>
                </div>

            </header>
        </>
    )
}

export default AdminHeader
