function SearchCard() {
    return(
        <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <h2 className="text-2xl font-semibold text-[#1f1f1f]">
                Search available Pets
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-grey-500">Location</p>
                    <select className="mt-1 w-full bg-transparent outline-none">
                        <option value="">Select Location</option>
                        <option value="any">Any</option>
                        <option value="new-york">New York, NY</option>
                        <option value="los-angeles">Los Angeles, CA</option>
                        <option value="chicago">Chicago, IL</option>
                        <option value="houston">Houston, TX</option>
                        <option value="miami">Miami, FL</option>
                        <option value="dallas">Dallas, TX</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Pet Type</p>
                    <select className="mt-1 w-full bg-transparent outline-none">
                        <option value="">Select Pet Type</option>
                        <option value="any">Any</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Gender</p>
                    <select className="mt-1 w-full bg-transparent outline-none">
                        <option>Any</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Age</p>
                    <select className="mt-1 w-full bg-transparent outline-none ">
                        <option>1 - 3 Years</option>
                        <option>Under 1 Year</option>
                        <option>4+ Years</option>
                    </select>
                </div>

                <button className="rounded-2xl bg-[#1f5c3f] px-6 py-4 font-medium text-white hover:bg-[#174a32] cursor-pointer">
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchCard;