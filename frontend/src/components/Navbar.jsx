//navbar for quick navigation across the website. It includes the logo, navigation links, and login/register buttons.

import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
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

                        <div className="absolute left-0 top-full z-50 hidden min-w-[240px] rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/10 group-hover:block">
                            <Link
                                to="/pets"
                                className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                            >
                                View available pets
                            </Link>

                            <Link
                                to="/login"
                                className="block rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#1f5c3f]"
                            >
                                Your applications
                                <span className="ml-2 text-xs text-gray-400">(log in required)</span>
                            </Link>
                        </div>
                    </div>

                    {/* About */}
                    <NavLink
                        to="/about"
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
                                About
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#1f5c3f] origin-left transition-transform duration-300 ${
                                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                ></span>
                            </>
                        )}
                    </NavLink>

                    {/* Contact */}
                    <NavLink
                        to="/contact"
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
                                Contact
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#1f5c3f] origin-left transition-transform duration-300 ${
                                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                ></span>
                            </>
                        )}
                    </NavLink>

                </nav>

                <div className="flex items-center gap-3">
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
                </div>
            </div>
        </header>
    );
}

export default Navbar;