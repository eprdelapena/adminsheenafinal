"use client";

import React, { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import { EAdminRoutes } from "@/enum/main_enum";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = usePathname().split("/");
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <SessionProvider>
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md relative">
          <h1 className="text-xl font-bold">Admin Panel</h1>

          {/* Hamburger Icon - only visible on mobile */}
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a
                  href={EAdminRoutes.DASHBOARDADMIN}
                  className={`hover:underline ${router.includes("admin") ? "text-yellow-400" : "text-white"}`}
                >
                  Admin List
                </a>
              </li>
              <li>
                <a
                  href={EAdminRoutes.DASHBOARDSUMMARY}
                  className={`hover:underline ${router.includes("summary") ? "text-yellow-400" : "text-white"}`}
                >
                  Summary
                </a>
              </li>
              <li>
                <a
                  href={EAdminRoutes.DASHBOARDPRODUCT}
                  className={`hover:underline ${router.includes("product") ? "text-yellow-400" : "text-white"}`}
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href={EAdminRoutes.DASHBOARDPOSTORDER}
                  className={`hover:underline ${router.includes("postorder") ? "text-yellow-400" : "text-white"}`}
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href={EAdminRoutes.DASHBOARDORDERS}
                  className={`hover:underline ${router.includes("orders") ? "text-yellow-400" : "text-white"}`}
                >
                  Orders
                </a>
              </li>
              <li>
                <button className={"hover:underline"} onClick={() => signOut()}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <nav className="absolute top-full left-0 w-full bg-blue-500 md:hidden z-10">
              <ul className="flex flex-col space-y-2 p-4">
                <li>
                  <a
                    href={EAdminRoutes.DASHBOARDADMIN}
                    className={"hover:underline"}
                  >
                    Admin List
                  </a>
                </li>
                <li>
                  <a
                    href={EAdminRoutes.DASHBOARDSUMMARY}
                    className={"hover:underline"}
                  >
                    Summary
                  </a>
                </li>
                <li>
                  <a
                    href={EAdminRoutes.DASHBOARDPRODUCT}
                    className={"hover:underline"}
                  >
                    Product
                  </a>
                </li>
                <li>
                  <a
                    href={EAdminRoutes.DASHBOARDPOSTORDER}
                    className={"hover:underline"}
                  >
                    Cart
                  </a>
                </li>
                <li>
                  <a
                    href={EAdminRoutes.DASHBOARDORDERS}
                    className={"hover:underline"}
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <button className={"hover:underline"} onClick={() => signOut()}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </header>
        {children}
      </SessionProvider>
    </>
  );
};

export default Layout;
