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

                <nav className="hidden md:flex items-center gap-8 text-[15px] text-gray-600">
                    <a href="#" className="font-medium text-[#1f5c3f]">Home</a>
                    <a href="#">Adopt</a>
                    <a href="#">Foster</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium cursor-pointer transition duration-200 hover:bg-gray-200">
                        Login
                    </button>
                    <button className="rounded-xl bg-[#1f5c3f] px-5 py-2 text-sm font-medium text-white hover:bg-[#174a32] cursor-pointer">
                        Register
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;