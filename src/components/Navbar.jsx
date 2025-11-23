import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineViewList } from "react-icons/hi";
import { useCart } from "../hooks/useCart";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  const navLinks = useMemo(
    () => [
      { name: "HOME", to: "/" },
      { name: "ALL PRODUCTS", to: "/products" },
      { name: "ABOUT", to: "/about" },
      { name: "CONTACT", to: "/contact" },
      { name: "ACCOUNT  ↯", to: "/dashboard" },
    ],
    []
  );

  const openMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="bg-white px-2 py-4">
        <div className="flex justify-between items-center mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <Link to="/">
            <img
              src="/images/amazonlogo.svg"
              alt="Logo"
              className="h-16 sm:h-20"
            />
          </Link>

          <button
            className="sm:hidden text-primary-default hover:text-primary-dark"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <HiOutlineViewList className="text-3xl" />
          </button>

          <nav className="hidden sm:flex items-center">
            <ul className="flex">
              {navLinks.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);

                return (
                  <li
                    key={link.to}
                    className={`mx-4 text-xs ${
                      isActive ? "text-primary-default" : "text-gray-700"
                    }`}
                  >
                    <Link to={link.to}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/cart"
              state={{ from: location?.pathname }}
              className="relative flex flex-col items-center ml-6"
            >
              <HiOutlineShoppingBag className="text-primary-default text-4xl" />
              {count > 0 && (
                <span className="top-4 right-0 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          navLinks={navLinks}
          location={location}
        />
      )}
    </>
  );
}

export default Navbar;
