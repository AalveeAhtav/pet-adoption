//navbar for quick navigation across the website. It includes the logo, navigation links, and login/register buttons.

import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === "admin";

    // state for popup cards
    const [activeCard, setActiveCard] = useState(null);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        if (activeCard) {
            setTimeout(() => setShowCard(true), 10);
        } else {
            setShowCard(false);
        }
    }, [activeCard]);

    const closeCard = () => {
        setShowCard(false);

        setTimeout(() => {
            setActiveCard(null);
        }, 250);
    };

    return (
        <>
            <header className="w-full bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f5c3f] text-white text-lg">
                            <span className="text-white text-lg">🐈</span>
                        </div>
                        <span className="text-lg font-semibold">Pet Adoption</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-[15px]">

                        {/* Home */}
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `group relative font-medium transition-colors duration-200 ${
                                    isActive
                                        ? "text-[#1f5c3f]"
                                        : "text-gray-600 hover:text-[#1f5c3f]"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Home
                                    <span
                                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#1f5c3f] origin-left transition-transform duration-300 ${
                                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    ></span>
                                </>
                            )}
                        </NavLink>

                        {/* Adopt/Foster */}
                        <div className="relative group">
                            <NavLink
                                to="/pets"
                                className={({ isActive }) =>
                                    `group relative transition-colors duration-200 ${
                                        isActive
                                            ? "text-[#1f5c3f]"
                                            : "text-gray-600 hover:text-[#1f5c3f]"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        Adopt/Foster
                                        <span
                                            className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#1f5c3f] origin-left transition-transform duration-300 ${
                                                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        ></span>
                                    </>
                                )}
                            </NavLink>

                            <div className="absolute left-0 top-full z-50 hidden min-w-[260px] rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/10 group-hover:block">
                                <Link
                                    to="/pets"
                                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                                >
                                    View available pets
                                </Link>

                                <Link
                                    to={user ? "/applications" : "/login"}
                                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                                >
                                    Your applications
                                    {!user && (
                                        <span className="ml-2 text-xs text-gray-400">
                                            (log in required)
                                        </span>
                                    )}
                                </Link>

                                {isAdmin && (
                                    <>
                                        <Link
                                            to="/admin/applications"
                                            className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                                        >
                                            View all applications
                                        </Link>

                                        <Link
                                            to="/admin/add-pet"
                                            className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                                        >
                                            Add a pet
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* About */}
                        <button
                            type="button"
                            onClick={() => setActiveCard("about")}
                            className="group relative cursor-pointer text-gray-600 transition-colors duration-200 hover:text-[#1f5c3f]"
                        >
                            About
                            <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-[#1f5c3f] origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </button>

                        {/* Contact */}
                        <button
                            type="button"
                            onClick={() => setActiveCard("contact")}
                            className="group relative cursor-pointer text-gray-600 transition-colors duration-200 hover:text-[#1f5c3f]"
                        >
                            Contact
                            <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-[#1f5c3f] origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </button>

                    </nav>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <span className="hidden text-sm text-gray-600 lg:inline">
                                    Hi, {user.fullName}
                                    {isAdmin && (
                                        <span className="ml-2 rounded-full bg-[#e8f1ec] px-2 py-1 text-xs text-[#1f5c3f]">
                                            Admin
                                        </span>
                                    )}
                                </span>

                                <button
                                    onClick={logout}
                                    className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium cursor-pointer transition duration-200 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium cursor-pointer transition duration-200 hover:bg-gray-200">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/signup">
                                    <button className="rounded-xl bg-[#1f5c3f] px-5 py-2 text-sm font-medium text-white hover:bg-[#174a32] cursor-pointer">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* popup overlay */}
            {activeCard && (
                <div
                    className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-250 ${
                        showCard ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
                    }`}
                    onClick={closeCard}
                >
                    <div
                        className={`relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl transition-all duration-250 ${
                            showCard
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-4 scale-95 opacity-0"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeCard}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-[#1f5c3f]"
                        >
                            ×
                        </button>

                        {activeCard === "about" && (
                            <div>
                                <h2 className="text-3xl font-bold text-[#1f5c3f]">About Us</h2>
                                <p className="mt-4 text-[16px] leading-7 text-gray-700">
                                    Welcome to Pet Adoption. Our goal is to connect loving families
                                    with pets who need safe and happy homes. Whether you are looking
                                    to adopt or foster, we make the process simple, friendly, and
                                    caring for both pets and people.
                                </p>
                                <p className="mt-4 text-[16px] leading-7 text-gray-700">
                                    We believe every pet deserves a second chance, and every family
                                    deserves the joy of finding the right companion.
                                </p>
                            </div>
                        )}

                        {activeCard === "contact" && (
                            <div>
                                <h2 className="text-3xl font-bold text-[#1f5c3f]">Contact Us</h2>
                                <div className="mt-5 space-y-3 text-[18px] text-gray-700">
                                    <p>
                                        <span className="font-semibold text-[#1f5c3f]">Email:</span>{" "}
                                        supportpetadoption@gmail.com
                                    </p>
                                    <p>
                                        <span className="font-semibold text-[#1f5c3f]">Phone:</span>{" "}
                                        (123) 456-7890
                                    </p>
                                    <p>
                                        <span className="font-semibold text-[#1f5c3f]">Address:</span>{" "}
                                        123 Pet Street, City, State, ZIP
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;