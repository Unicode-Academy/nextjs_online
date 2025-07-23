"use client";
import { ChevronsLeft } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useRef, useState } from "react";
export default function Navigation() {
  const sidebarRef = useRef<HTMLBaseElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const handleMouseMove = (e: MouseEvent) => {
    let x = e.clientX;
    if (x < 250) {
      x = 250;
    }
    if (x > 500) {
      x = 500;
    }
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${x}px`;
    }
    document.body.style.userSelect = "none";
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "auto";
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleToggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.padding = "0";
    }

    if (navbarRef.current) {
      navbarRef.current.style.left = "20px";
    }

    setToggle(!toggle);
  };

  const handleResetSidebar = () => {
    if (navbarRef.current) {
      navbarRef.current.style.left = "250px";
    }
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "";
      sidebarRef.current.style.padding = "";
    }
    setToggle(!toggle);
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className="group/sidebar w-[250px] bg-[#efefef] h-full p-3 relative overflow-x-hidden transition-all duration-300 ease-in-out z-[9999]"
      >
        <p>Navigation</p>
        <div
          className="absolute right-[5px] top-5 cursor-pointer hover:bg-gray-300 rounded-sm text-[#999] opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300"
          onClick={handleToggleSidebar}
        >
          <ChevronsLeft />
        </div>
        <div
          onMouseDown={handleMouseDown}
          className="group-hover/sidebar:opacity-100 absolute w-[4px] bg-gray-300 h-full right-0 top-0 opacity-0 transition-all duration-300 cursor-ew-resize"
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className="w-[calc(100%-250px)] absolute top-0 left-[250px] py-5 flex"
      >
        {toggle && (
          <div className="cursor-pointer" onClick={handleResetSidebar}>
            <AlignJustify />
          </div>
        )}
        <div>Tiêu đề</div>
      </div>
    </>
  );
}
