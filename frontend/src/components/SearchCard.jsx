//search card component for filtering pets based on location, pet type, gender, age, and purpose. It includes dropdowns for each filter and a search button to apply the filters.

function SearchCard({ filters, onFilterChange, onSearch }) {
    return(
        <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <h2 className="text-2xl font-semibold text-[#1f1f1f]">
                Search available Pets
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Location</p>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={onFilterChange}
                        className="mt-1 w-full bg-transparent outline-none"
                    >
                        <option value="">Select Location</option>
                        <option value="any">Any</option>
                        <option value="dallas">Dallas, TX</option>
                        <option value="plano">Plano, TX</option>
                        <option value="richardson">Richardson, TX</option>
                        <option value="garland">Garland, TX</option>
                        <option value="mckinney">McKinney, TX</option>
                        <option value="frisco">Frisco, TX</option>
                        <option value="irving">Irving, TX</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Pet Type</p>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                        className="mt-1 w-full bg-transparent outline-none"
                    >
                        <option value="">Select Pet Type</option>
                        <option value="any">Any</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Gender</p>
                    <select
                        name="gender"
                        value={filters.gender}
                        onChange={onFilterChange}
                        className="mt-1 w-full bg-transparent outline-none"
                    >
                        <option value="any">Any</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Age</p>
                    <select
                        name="age"
                        value={filters.age}
                        onChange={onFilterChange}
                        className="mt-1 w-full bg-transparent outline-none "
                    >
                        <option value="any">Any Age</option>
                        <option value="Under 1 Year">Under 1 Year</option>
                        <option value="1 - 3 Years">1 - 3 Years</option>
                        <option value="4+ Years">4+ Years</option>
                    </select>
                </div>

                <div className="rounded-2xl bg-[#f3f4f1] px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <p className="text-xs text-gray-500">Purpose</p>
                    <select
                        name="purpose"
                        value={filters.purpose}
                        onChange={onFilterChange}
                        className="mt-1 w-full bg-transparent outline-none"
                    >
                        <option value="any">Any</option>
                        <option value="adoption">Adoption</option>
                        <option value="foster">Foster</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onSearch}
                    className="rounded-2xl bg-[#1f5c3f] px-6 py-4 font-medium text-white hover:bg-[#174a32] cursor-pointer"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchCard;