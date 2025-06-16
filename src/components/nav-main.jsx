import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";

export function NavMain({ items }) {
  const [activeIndex, setActiveIndex] = useState(null); // track the opened submenu

  const handleClick = (index) => {
    setActiveIndex(prev => prev === index ? null : index); // toggle open/close
  };

  return (
    <aside className="admin-panel-sidebar rounded-2xl overflow-auto">
      <div className="overlay-sidebar"></div>
      <nav className="sidebar_wrapper">
        <ul className="sidebar_menus">
          {items?.map((menu, index) => (
            menu?.hasSubMenu ? (
              <li
                key={index}
                onClick={() => handleClick(index)}
                className={`sidebar_menu overflow-hidden bg-white m-2 p-1 rounded-lg shadow uppercase ${menu?.hasSubMenu ? "has_submenu" : ""}`}
              >
                <a
                  href="#"
                  className="block p-2 rounded-lg border border-dashed pt-3 ps-5 relative overflow-hidden transition-all text-sm"
                >
                  {menu.icon && React.createElement(menu.icon, { className: "inline mb-1 me-1" })}
                  {menu.title}
                  {menu?.hasSubMenu && (
                    <IoIosArrowDown
                      className={`inline absolute right-3 mt-[3px] arrow_down transition-all ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>
                <ul
                  className={`submenu animate__animated animate__zoomIn animate__faster text-sm ${
                    activeIndex === index ? "active_submenu" : ""
                  }`}
                >
                  {menu?.items.map((submenu, subindex) => (
                    <li key={subindex}>
                      <NavLink
                        to={submenu.url}
                        className="block p-1 rounded-2xl border border-dashed relative overflow-hidden transition-all text-[12px]"
                      >
                        {submenu.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li
                key={index}
                className="sidebar_menu bg-white m-2 p-1 rounded-lg shadow uppercase"
              >
                <NavLink
                  to={menu.url}
                  className="block p-2 rounded-lg border border-dashed pt-3 ps-5 relative overflow-hidden transition-all text-sm"
                >
                  {menu.icon && React.createElement(menu.icon, { className: "inline mb-1 me-1" })}
                  {menu.title}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>
    </aside>
  );
}
