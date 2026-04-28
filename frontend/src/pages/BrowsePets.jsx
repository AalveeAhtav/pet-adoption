import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import apiClient from "../lib/apiClient";

function BrowsePets() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    //dummy pet data for now, replace it with database later
    const defaultPets = [
        {
            id: 1,
            name: "Max",
            breed: "Golden Retriever",
            type: "dog",
            age: "2 Years",
            gender: "Male",
            location: "Dallas, TX",
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
            purpose: "adoption",
            description: "Max is a friendly and playful dog who loves long walks, attention, and spending time with families. He would make a great forever companion for an active home.",
        },
        {
            id: 2,
            name: "Bella",
            breed: "Labrador",
            type: "dog",
            age: "1 Year",
            gender: "Female",
            location: "Plano, TX",
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
            purpose: "foster",
            description: "Bella is gentle, affectionate, and still adjusting to shelter life. She is currently looking for a safe foster home where she can feel comfortable and cared for.",
        },
        {
            id: 3,
            name: "Oliver",
            breed: "Tabby Cat",
            type: "cat",
            age: "3 Years",
            gender: "Male",
            location: "Richardson, TX",
            image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80",
            purpose: "adoption",
            description: "Oliver is a calm and curious cat who enjoys cozy naps and quiet afternoons. He is ready for a permanent home where he can settle in and be loved.",
        },
        {
            id: 4,
            name: "Daisy",
            breed: "Beagle",
            type: "dog",
            age: "2 Years",
            gender: "Female",
            location: "Garland, TX",
            image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
            purpose: "adoption",
            description: "Daisy is energetic, sweet, and always excited to meet new people. She would do well with a family that can give her playtime, attention, and a loving forever home.",
        },
        {
            id: 5,
            name: "Rocky",
            breed: "German Shepherd",
            type: "dog",
            age: "4 Years",
            gender: "Male",
            location: "McKinney, TX",
            image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
            purpose: "foster",
            description: "Rocky is loyal and intelligent, but he needs a temporary foster placement while he continues his transition. He does best with structure, patience, and a calm environment.",
        },
        {
            id: 6,
            name: "Luna",
            breed: "Siamese Cat",
            type: "cat",
            age: "1 Year",
            gender: "Female",
            location: "Frisco, TX",
            image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80",
            purpose: "adoption",
            description: "Luna is affectionate, playful, and loves being near people. She is available for adoption and would be a wonderful fit for someone looking for a loving companion.",
        },
        {
            id: 7,
            name: "Charlie",
            breed: "Poodle",
            type: "dog",
            age: "2 Years",
            gender: "Male",
            location: "Irving, TX",
            image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
            purpose: "foster",
            description: "Charlie is smart, friendly, and easy to bond with. He is currently looking for a foster home that can give him consistent care and a comfortable place to stay.",
        },
        {
            id: 8,
            name: "Milo",
            breed: "Orange Tabby",
            type: "cat",
            age: "5 Months",
            gender: "Male",
            location: "Dallas, TX",
            image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
            purpose: "adoption",
            description: "Milo is a young and playful kitten full of energy and curiosity. He is available for adoption and would thrive in a home ready for a fun and lovable new addition.",
        },
    ];

    //state for all available pets loaded from localStorage or default data
    const [availablePets, setAvailablePets] = useState([]);

    useEffect(() => {
        async function loadPets() {
            try {
                const { data } = await apiClient.get("/pets");

                const mappedPets = data.map((pet) => ({
                    id: pet.pet_id,
                    name: pet.pet_name,
                    breed: pet.breed || "Unknown Breed",
                    type: (pet.species || "other").toLowerCase(),
                    age: pet.age !== null ? `${pet.age} Years` : "Unknown",
                    gender: "Unknown",
                    location: "Shelter",
                    image:
                        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
                    purpose: "adoption",
                    description: `${pet.pet_name} is currently ${pet.status?.toLowerCase() || "available"} and looking for a home.`,
                }));

                if (mappedPets.length > 0) {
                    setAvailablePets(mappedPets);
                    return;
                }
            } catch (_error) {
                // Fall back to demo data if backend is unavailable.
            }

            const storedPets = JSON.parse(localStorage.getItem("pets")) || [];
            const mergedPets = [...defaultPets];

            storedPets.forEach((storedPet) => {
                const alreadyExists = mergedPets.some(
                    (pet) => Number(pet.id) === Number(storedPet.id)
                );

                if (!alreadyExists) {
                    mergedPets.push(storedPet);
                }
            });

            localStorage.setItem("pets", JSON.stringify(mergedPets));
            setAvailablePets(mergedPets);
        }

        loadPets();
    }, []);

    //state for the current filter values inside the search card
    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        type: searchParams.get("type") || "",
        gender: searchParams.get("gender") || "any",
        age: searchParams.get("age") || "any",
        purpose: searchParams.get("purpose") || "any",
    });

    //state for the filters that are actually applied after clicking the search button
    const [appliedFilters, setAppliedFilters] = useState({
        location: searchParams.get("location") || "",
        type: searchParams.get("type") || "",
        gender: searchParams.get("gender") || "any",
        age: searchParams.get("age") || "any",
        purpose: searchParams.get("purpose") || "any",
    });

    //state for the currently selected pet when the user clicks view details
    const [selectedPet, setSelectedPet] = useState(null);

    //state for admin edit mode inside the pet modal
    const [isEditingPet, setIsEditingPet] = useState(false);

    //state for the editable pet form fields
    const [editFormData, setEditFormData] = useState({
        name: "",
        breed: "",
        type: "",
        age: "",
        gender: "",
        location: "",
        image: "",
        purpose: "",
        description: "",
    });

    //handles changes in the search card dropdowns
    function handleFilterChange(event) {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }

    //applies the current filters when the search button is clicked
    function handleSearch() {
        setAppliedFilters(filters);
    }

    //helper function to convert the age string into a number of years
    function getPetAgeInYears(ageText) {
        if (ageText.includes("Months")) {
            const months = parseInt(ageText);
            return months / 12;
        }

        if (ageText.includes("Year")) {
            return parseInt(ageText);
        }

        return 0;
    }

    //opens the modal with the selected pet
    function handleOpenPetDetails(pet) {
        setSelectedPet(pet);
        setIsEditingPet(false);
        setEditFormData({
            name: pet.name,
            breed: pet.breed,
            type: pet.type,
            age: pet.age,
            gender: pet.gender,
            location: pet.location,
            image: pet.image,
            purpose: pet.purpose,
            description: pet.description,
        });
    }

    //handles changes in the admin edit pet form
    function handleEditFormChange(event) {
        const { name, value } = event.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    //saves the edited pet and updates localStorage
    function handleSavePetEdits() {
        if (!selectedPet) {
            return;
        }

        const updatedPets = availablePets.map((pet) =>
            Number(pet.id) === Number(selectedPet.id)
                ? { ...pet, ...editFormData }
                : pet
        );

        const updatedSelectedPet = updatedPets.find(
            (pet) => Number(pet.id) === Number(selectedPet.id)
        );

        setAvailablePets(updatedPets);
        localStorage.setItem("pets", JSON.stringify(updatedPets));
        setSelectedPet(updatedSelectedPet);
        setIsEditingPet(false);
    }

    //navigates to the correct application page based on whether the pet is for adoption or foster
    function handleApplyClick(pet) {
        if (pet.purpose === "adoption") {
            navigate(`/apply-adoption/${pet.id}`, {
                state: pet,
            });
        } else {
            navigate(`/apply-foster/${pet.id}`, {
                state: pet,
            });
        }

        setSelectedPet(null);
        setIsEditingPet(false);
    }

    //handles deleting a pet for admins only and also removes any related applications
    function handleDeletePet(petId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this pet? This will also remove related applications."
        );

        if (!confirmed) {
            return;
        }

        const updatedPets = availablePets.filter(
            (pet) => Number(pet.id) !== Number(petId)
        );

        const existingApplications =
            JSON.parse(localStorage.getItem("applications")) || [];

        const updatedApplications = existingApplications.filter(
            (application) => Number(application.petId) !== Number(petId)
        );

        setAvailablePets(updatedPets);
        localStorage.setItem("pets", JSON.stringify(updatedPets));
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
        setSelectedPet(null);
        setIsEditingPet(false);
    }

    //filters the pets based on the selected search values
    const filteredPets = availablePets.filter((pet) => {
        const petAgeInYears = getPetAgeInYears(pet.age);

        const matchesLocation =
            appliedFilters.location === "" ||
            appliedFilters.location === "any" ||
            pet.location.toLowerCase().includes(appliedFilters.location.toLowerCase());

        const matchesType =
            appliedFilters.type === "" ||
            appliedFilters.type === "any" ||
            pet.type === appliedFilters.type;

        const matchesGender =
            appliedFilters.gender === "any" ||
            pet.gender === appliedFilters.gender;

        const matchesAge =
            appliedFilters.age === "any" ||
            (appliedFilters.age === "Under 1 Year" && petAgeInYears < 1) ||
            (appliedFilters.age === "1 - 3 Years" && petAgeInYears >= 1 && petAgeInYears <= 3) ||
            (appliedFilters.age === "4+ Years" && petAgeInYears >= 4);

        const matchesPurpose =
            appliedFilters.purpose === "any" ||
            pet.purpose === appliedFilters.purpose;

        return matchesLocation && matchesType && matchesGender && matchesAge && matchesPurpose;
    });

    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            {/* Page heading section */}
            <section className="mx-auto max-w-7xl px-8 py-16">
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-semibold md:text-5xl">
                        Browse Available Pets
                    </h1>
                    <p className="mt-4 leading-8 text-gray-600">
                        Explore our loving pets waiting for a forever home. Find your new best friend today! Use the filters to narrow down your search and discover the perfect companion for you and your family.
                    </p>
                </div>
            </section>

            {/* filter section */}
            <section className="mx-auto max-w-7xl px-8">
                <div className="mt-6">
                    <SearchCard
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                    />
                </div>
            </section>

            {/* pets grid section */}
            <section className="mx-auto max-w-7xl px-8 py-16">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Available Pets</h2>
                    <p className="text-sm text-gray-500">{filteredPets.length} pets found</p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {filteredPets.map((pet) => (
                        <div
                            key={pet.id}
                            className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="h-60 w-full object-cover"
                            />

                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="text-xl font-semibold">{pet.name}</h3>
                                <p className="mt-1 text-gray-500">{pet.breed}</p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {pet.location}
                                </p>

                                <div className="mt-2 flex flex-nowrap items-center gap-2 overflow-hidden">
                                    <span className="whitespace-nowrap rounded-full bg-[#eef3ef] px-2.5 py-1 text-xs text-[#1f5c3f]">
                                        {pet.age}
                                    </span>
                                    <span className="whitespace-nowrap rounded-full bg-[#f4f4f4] px-2.5 py-1 text-xs text-gray-600">
                                        {pet.gender}
                                    </span>
                                    <span className="whitespace-nowrap rounded-full bg-[#e8f1ec] px-2.5 py-1 text-xs font-medium text-[#1f5c3f]">
                                        {pet.purpose === "adoption" ? "Adoption" : pet.purpose === "foster" ? "Foster" : "Adoption/Foster"}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleOpenPetDetails(pet)}
                                    className="mt-4 w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* pet details modal section. It opens when clicking view details and shows the pet description with the correct adoption or foster button. */}
            {selectedPet && (
                <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/50 px-4">
                    <div className="relative w-full max-w-2xl animate-[modalPop_0.25s_ease-out] rounded-[28px] bg-white p-6 shadow-2xl md:p-8">

                        <button
                            onClick={() => {
                                setSelectedPet(null);
                                setIsEditingPet(false);
                            }}
                            className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-600 shadow-md hover:bg-gray-100 cursor-pointer"
                        >
                            ×
                        </button>

                        {isEditingPet ? (
                            <div className="mt-4">
                                <h3 className="text-3xl font-semibold text-[#123826]">
                                    Edit Pet
                                </h3>

                                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditFormChange}
                                        placeholder="Pet name"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    />

                                    <input
                                        type="text"
                                        name="breed"
                                        value={editFormData.breed}
                                        onChange={handleEditFormChange}
                                        placeholder="Breed"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    />

                                    <select
                                        name="type"
                                        value={editFormData.type}
                                        onChange={handleEditFormChange}
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    >
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="age"
                                        value={editFormData.age}
                                        onChange={handleEditFormChange}
                                        placeholder="Age"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    />

                                    <select
                                        name="gender"
                                        value={editFormData.gender}
                                        onChange={handleEditFormChange}
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="location"
                                        value={editFormData.location}
                                        onChange={handleEditFormChange}
                                        placeholder="Location"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                                    />

                                    <input
                                        type="text"
                                        name="image"
                                        value={editFormData.image}
                                        onChange={handleEditFormChange}
                                        placeholder="Image URL"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                                    />

                                    <select
                                        name="purpose"
                                        value={editFormData.purpose}
                                        onChange={handleEditFormChange}
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                                    >
                                        <option value="adoption">Adoption</option>
                                        <option value="foster">Foster</option>
                                        <option value="adoption/foster">Adoption/Foster</option>
                                    </select>

                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditFormChange}
                                        rows="5"
                                        placeholder="Description"
                                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                                    />
                                </div>

                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        onClick={handleSavePetEdits}
                                        className="w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        onClick={() => setIsEditingPet(false)}
                                        className="w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={selectedPet.image}
                                    alt={selectedPet.name}
                                    className="mt-4 h-72 w-full rounded-[20px] object-cover"
                                />

                                <div className="mt-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-3xl font-semibold">{selectedPet.name}</h3>
                                        <span className="rounded-full bg-[#e8f1ec] px-3 py-1 text-sm font-medium text-[#1f5c3f]">
                                            {selectedPet.purpose === "adoption" ? "Adoption" : selectedPet.purpose === "foster" ? "Foster" : "Adoption/Foster"}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-lg text-gray-500">{selectedPet.breed}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-[#eef3ef] px-3 py-1 text-sm text-[#1f5c3f]">
                                            {selectedPet.age}
                                        </span>
                                        <span className="rounded-full bg-[#f4f4f4] px-3 py-1 text-sm text-gray-600">
                                            {selectedPet.gender}
                                        </span>
                                        <span className="rounded-full bg-[#f4f4f4] px-3 py-1 text-sm text-gray-600">
                                            {selectedPet.location}
                                        </span>
                                    </div>

                                    <p className="mt-6 leading-7 text-gray-600">
                                        {selectedPet.description}
                                    </p>

                                    <p className="mt-6 text-sm font-medium text-[#1f5c3f]">
                                        {selectedPet.purpose === "adoption"
                                            ? "Available for Adoption"
                                            : selectedPet.purpose === "foster"
                                            ? "Available for Foster"
                                            : "Available for Adoption or Foster"}
                                    </p>

                                    <div className="mt-4 flex flex-col gap-3">
                                        <button
                                            onClick={() => handleApplyClick(selectedPet)}
                                            className="w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer"
                                        >
                                            {selectedPet.purpose === "adoption"
                                                ? "Apply for Adoption"
                                                : "Apply for Foster"}
                                        </button>

                                        {user?.role === "admin" && (
                                            <>
                                                <button
                                                    onClick={() => setIsEditingPet(true)}
                                                    className="w-full rounded-xl border border-[#1f5c3f] bg-[#eef3ef] py-3 font-medium text-[#1f5c3f] transition hover:bg-[#e3ece6] cursor-pointer"
                                                >
                                                    Edit Pet
                                                </button>

                                                <button
                                                    onClick={() => handleDeletePet(selectedPet.id)}
                                                    className="w-full rounded-xl border border-red-200 bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100 cursor-pointer"
                                                >
                                                    Delete Pet
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* animation styles for the pet details modal */}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes modalPop {
                        from {
                            opacity: 0;
                            transform: scale(0.96) translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1) translateY(0);
                        }
                    }
                `}
            </style>

            <Footer />

        </div>
    )

}

export default BrowsePets;