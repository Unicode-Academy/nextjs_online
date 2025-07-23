"use client";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { ChevronsLeft } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
export default function Navigation() {
  const { isLoading } = useConvexAuth();
  const sidebarRef = useRef<HTMLBaseElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [toggle, setToggle] = useState<boolean>(isMobile);

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
    if (navbarRef.current) {
      navbarRef.current.style.left = `${x}px`;
      navbarRef.current.style.width = `calc(100% - ${x}px)`;
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
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "";
    }
  };
  const handleToggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.transition = `all 0.3s ease-in-out`;
      sidebarRef.current.style.paddingLeft = "0";
      sidebarRef.current.style.paddingRight = "0";
    }

    if (navbarRef.current) {
      navbarRef.current.style.left = "20px";
      if (isMobile) {
        navbarRef.current.style.width = "";
      }
    }

    setToggle(!toggle);
  };

  const handleResetSidebar = () => {
    if (navbarRef.current) {
      navbarRef.current.style.left = isMobile ? "100%" : "250px";
      if (isMobile) {
        navbarRef.current.style.width = "0";
      } else {
        navbarRef.current.style.width = "calc(100% - 250px)";
      }
    }
    if (sidebarRef.current) {
      if (isMobile) {
        sidebarRef.current.style.width = "100%";
      } else {
        sidebarRef.current.style.width = "250px";
      }

      sidebarRef.current.style.paddingLeft = "";
      sidebarRef.current.style.paddingRight = "";
    }
    setToggle(!toggle);
  };
  if (isLoading) {
    return;
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar bg-[#efefef] h-full p-3 relative overflow-x-hidden z-[9999]",
          isMobile
            ? "w-0 px-0 transition-all duration-300 ease-in-out"
            : "w-[250px]"
        )}
      >
        <p>Navigation</p>
        <div
          className={cn(
            "absolute right-[5px] top-5 cursor-pointer hover:bg-gray-300 rounded-sm text-[#999] group-hover/sidebar:opacity-100 transition-all duration-300",
            isMobile ? "opacity-100" : "opacity-0"
          )}
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
        className={cn(
          "w-[calc(100%-250px)] absolute top-0 py-5 flex",
          isMobile ? "left-5 w-full" : "left-[250px]"
        )}
      >
        {(toggle || isMobile) && (
          <div className="cursor-pointer" onClick={handleResetSidebar}>
            <AlignJustify />
          </div>
        )}
        <div>Tiêu đề</div>
      </div>
    </>
  );
}
