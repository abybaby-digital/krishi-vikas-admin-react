import React, { useContext } from 'react'
import logo from "../assets/images/kv-logo.png"
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const SidebarCustom = () => {
    let hasSubmenu = true;
    return (
        <>
            <aside className={`admin-panel-sidebar rounded-2xl overflow-hidden`}>
                <div className="overlay-sidebar"></div>
                <nav className='sidebar_wrapper'>
                    <ul className='sidebar_menus'>
                        <li className='sidebar_menu bg-white m-2 p-1 rounded-lg shadow uppercase'>
                            <NavLink to="" className='block p-2 rounded-lg border border-dashed pt-3 ps-10 relative overflow-hidden transition-all text-sm'>
                                <TbLayoutDashboardFilled className='inline mb-1 me-1' />Dashboard
                            </NavLink>
                        </li>
                        <li className={`sidebar_menu overflow-hidden bg-white m-2 p-1 rounded-lg shadow uppercase  ${hasSubmenu ? "has_submenu" : ""}`}>
                            <a href='javascript:void(0)' className='block p-2 rounded-lg border border-dashed pt-3 ps-10 relative overflow-hidden transition-all text-sm'>
                                <TbLayoutDashboardFilled className='inline mb-1 me-1' />Has Submenu
                                {hasSubmenu ? <IoIosArrowDown className='inline absolute right-3 mt-[3px] arrow_down transition-all' /> : ""}
                            </a>
                            <ul className='submenu animate__animated animate__zoomIn animate__faster text-sm'>
                                <li>
                                    <NavLink to="#" className='block p-2 rounded-2xl border border-dashed pt-3 relative overflow-hidden transition-all'>MENU 1</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className='block p-2 rounded-2xl border border-dashed pt-3 relative overflow-hidden transition-all'>MENU 1</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className='block p-2 rounded-2xl border border-dashed pt-3 relative overflow-hidden transition-all'>MENU 1</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default SidebarCustom
