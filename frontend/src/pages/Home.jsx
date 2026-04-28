//main homepage for the pet adoption website. It includes a hero section, featured pets, and an explanation of the adoption process.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import Footer from "../components/Footer";
import heroImage from "../assets/hero_cat.jpg";
import { useAuth } from "../context/AuthContext";
import apiClient from "../lib/apiClient";

function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // These are dummy data so that I could quickly build the UI. The actual data would come from an API or database.
    const defaultPets = [
        {
            id: 1,
            name: "Max",
            breed: "Golden Retriever",
            type: "dog",
            age: "2 Years",
            gender: "Male",
            location: "Dallas, TX",
            purpose: "adoption",
            description: "Max is a friendly and playful dog who loves long walks, attention, and spending time with families. He would make a great forever companion for an active home.",
            image:
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 2,
            name: "Bella",
            breed: "Labrador",
            type: "dog",
            age: "1 Year",
            gender: "Female",
            location: "Plano, TX",
            purpose: "foster",
            description: "Bella is gentle, affectionate, and still adjusting to shelter life. She is currently looking for a safe foster home where she can feel comfortable and cared for.",
            image:
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 3,
            name: "Oliver",
            breed: "Tabby Cat",
            type: "cat",
            age: "3 Years",
            gender: "Male",
            location: "Richardson, TX",
            purpose: "adoption",
            description: "Oliver is a calm and curious cat who enjoys cozy naps and quiet afternoons. He is ready for a permanent home where he can settle in and be loved.",
            image:
                "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 4,
            name: "Daisy",
            breed: "Beagle",
            type: "dog",
            age: "2 Years",
            gender: "Female",
            location: "Garland, TX",
            purpose: "adoption",
            description: "Daisy is energetic, sweet, and always excited to meet new people. She would do well with a family that can give her playtime, attention, and a loving forever home.",
            image:
                "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 5,
            name: "Rocky",
            breed: "German Shepherd",
            type: "dog",
            age: "4 Years",
            gender: "Male",
            location: "McKinney, TX",
            purpose: "foster",
            description: "Rocky is loyal and intelligent, but he needs a temporary foster placement while he continues his transition. He does best with structure, patience, and a calm environment.",
            image:
                "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 6,
            name: "Luna",
            breed: "Siamese Cat",
            type: "cat",
            age: "1 Year",
            gender: "Female",
            location: "Frisco, TX",
            purpose: "adoption",
            description: "Luna is affectionate, playful, and loves being near people. She is available for adoption and would be a wonderful fit for someone looking for a loving companion.",
            image:
                "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 7,
            name: "Charlie",
            breed: "Poodle",
            type: "dog",
            age: "2 Years",
            gender: "Male",
            location: "Irving, TX",
            purpose: "foster",
            description: "Charlie is smart, friendly, and easy to bond with. He is currently looking for a foster home that can give him consistent care and a comfortable place to stay.",
            image:
                "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 8,
            name: "Milo",
            breed: "Orange Tabby",
            type: "cat",
            age: "5 Months",
            gender: "Male",
            location: "Dallas, TX",
            purpose: "adoption",
            description: "Milo is a young and playful kitten full of energy and curiosity. He is available for adoption and would thrive in a home ready for a fun and lovable new addition.",
            image:
                "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
        },
    ];

    //state for featured pets shown on the homepage
    const [featuredPets, setFeaturedPets] = useState([]);

    useEffect(() => {
        async function loadFeaturedPets() {
            try {
                const { data } = await apiClient.get("/pets");
                const mappedPets = data.map((pet) => ({
                    id: pet.pet_id,
                    name: pet.pet_name,
                    breed: pet.breed || "Unknown Breed",
                    type: (pet.species || "other").toLowerCase(),
                    age: pet.age !== null ? `${pet.age} Years` : "Unknown",
                    gender: pet.gender || "Unknown",
                    location: pet.shelter_location || "Shelter",
                    purpose: (pet.purpose || "adoption").toLowerCase(),
                    description:
                        pet.profile_description ||
                        `${pet.pet_name} is currently ${pet.status?.toLowerCase() || "available"} and looking for a home.`,
                    image:
                        pet.image_url ||
                        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
                }));

                setFeaturedPets(mappedPets.slice(0, 4));
                return;
            } catch (_error) {
                // fall back to default/home demo cards only if backend is unavailable
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
            setFeaturedPets(mergedPets.slice(0, 4));
        }

        loadFeaturedPets();
    }, []);

    //steps for the adoption and foster process
    const adoptionSteps = [
        {
            number: "01",
            title: "Browse Pets",
            text: "Use filters to find pets that match your lifestyle and preferences.",
        },
        {
            number: "02",
            title: "Meet the Pet",
            text: "Learn more about the pet and connect with the shelter for next steps.",
        },
        {
            number: "03",
            title: "Start Applying",
            text: "Submit your application and begin the adoption or foster process with confidence.",
        },
    ];

    //state for the search card filters on the homepage
    const [filters, setFilters] = useState({
        location: "",
        type: "",
        gender: "any",
        age: "any",
        purpose: "any",
    });

    //state for the currently selected featured pet when the user clicks view details
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

    //handles changes in the homepage search card dropdowns
    function handleFilterChange(event) {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }

    //navigates to the browse pets page and sends the selected filters in the URL
    function handleSearch() {
        const searchParams = new URLSearchParams();

        if (filters.location && filters.location !== "any") {
            searchParams.set("location", filters.location);
        }

        if (filters.type && filters.type !== "any") {
            searchParams.set("type", filters.type);
        }

        if (filters.gender && filters.gender !== "any") {
            searchParams.set("gender", filters.gender);
        }

        if (filters.age && filters.age !== "any") {
            searchParams.set("age", filters.age);
        }

        if (filters.purpose && filters.purpose !== "any") {
            searchParams.set("purpose", filters.purpose);
        }

        navigate(`/pets?${searchParams.toString()}`);
    }

    //opens the modal with the selected pet
    function handleOpenPetDetails(pet) {
        setSelectedPet(pet);
        setIsEditingPet(false);
        setEditFormData({
            name: pet.name,
            breed: pet.breed,
            type: pet.type || "",
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

    //saves the edited pet and updates localStorage and homepage list
    function handleSavePetEdits() {
        if (!selectedPet) {
            return;
        }

        const existingPets = JSON.parse(localStorage.getItem("pets")) || [];
        const updatedPets = existingPets.map((pet) =>
            Number(pet.id) === Number(selectedPet.id)
                ? { ...pet, ...editFormData }
                : pet
        );

        const updatedSelectedPet = updatedPets.find(
            (pet) => Number(pet.id) === Number(selectedPet.id)
        );

        localStorage.setItem("pets", JSON.stringify(updatedPets));
        setFeaturedPets(updatedPets.slice(0, 4));
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

        const existingPets = JSON.parse(localStorage.getItem("pets")) || [];
        const updatedPets = existingPets.filter(
            (pet) => Number(pet.id) !== Number(petId)
        );

        const existingApplications =
            JSON.parse(localStorage.getItem("applications")) || [];

        const updatedApplications = existingApplications.filter(
            (application) => Number(application.petId) !== Number(petId)
        );

        localStorage.setItem("pets", JSON.stringify(updatedPets));
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
        setFeaturedPets(updatedPets.slice(0, 4));
        setSelectedPet(null);
        setIsEditingPet(false);
    }

    //main return statement for the homepage. It includes the navbar, hero section, featured pets, adoption steps, and footer.
    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">

            {/* top navbar for the website. It includes the logo, navigation links, and login/register buttons. */}
            <Navbar />

            {/* hero section with a call to action to browse pets or start the adoption process. It also includes a search card for filtering pets. */}
            <section className="relative">
                <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-2">
                    <div className="bg-[#1f5c3f] px-10 py-20 text-white md:px-16">
                        <h1 className="max-w-xl text-5xl font-semibold leading-tight md:text-6xl">
                            Find Your New Best Friend
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-white/85">
                            Browse adoptable pets, start the adoption or foster process, and give a loving home to a pet in need. Your new best friend is just a few clicks away!
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => navigate("/pets")}
                                className="rounded-2xl bg-white px-6 py-3 font-medium text-[#1f5c3f] shadow-sm hover:bg-white/70 cursor-pointer"
                            >
                                Start Adopting/Fostering
                            </button>
                        </div>
                    </div>

                    <div className="min-h-[350px] bg-gray-100">
                        <img
                            src={heroImage}
                            alt="Hero cat"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
                    <SearchCard
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                    />
                </div>
            </section>

            {/* featured pets section. It displays a grid of featured pets with their name, breed, age, and a button to view more details. */}
            <section className="mx-auto max-w-7xl px-8 py-24">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Featured Pets</h2>
                    <button
                        onClick={() => navigate("/pets")}
                        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium"
                    >
                        View All Pets
                    </button>
                </div>

                {/* grid of pet cards */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {featuredPets.map((pet) => (
                        <div
                            key={pet.id}
                            className="overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="h-60 w-full object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold">{pet.name}</h3>
                                <p className="mt-1 text-gray-500">{pet.breed}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-[#eef3ef] px-3 py-1 text-sm text-[#1f5c3f]">
                                        {pet.age}
                                    </span>
                                    <span className="rounded-full bg-[#e8f1ec] px-3 py-1 text-sm font-medium text-[#1f5c3f]">
                                        {pet.purpose === "adoption" ? "Adoption" : pet.purpose === "foster" ? "Foster" : "Adoption/Foster"}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleOpenPetDetails(pet)}
                                    className="mt-5 w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white hover:bg-[#174a32] cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* adoption steps section. It explains the steps involved in the adoption process with descriptions. */}
            <section className="mx-auto max-w-7xl px-8 pb-24">
                <h2 className="text-3xl font-semibold">How Adoption/Foster Works</h2>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {adoptionSteps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-[24px] bg-white p-8 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f1ec] text-lg font-semibold text-[#1f5c3f]">
                                {step.number}
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                            <p className="mt-3 leading-7 text-gray-600">{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* why choose us section. It highlights the benefits of using the pet adoption platform and encourages users to join the community. */}
            <section className="mx-auto max-w-7xl px-8 pb-24">
                <div className="rounded-[28px] bg-[#1f5c3f] px-8 py-12 text-white">
                    <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
                    <p className="mt-4 max-w-6xl leading-8 text-white/85">
                        We are dedicated to connecting loving homes with pets in need. Our platform offers a wide variety of adoptable pets, easy-to-use search filters, and a supportive adoption and foster process. Join our community of pet lovers and give a deserving pet a forever home today!
                    </p>
                </div>
            </section>

            {/* pet details modal section. It opens when the user clicks view details and shows the pet description with the correct adoption or foster button. */}
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

            {/* footer section with contact information, quick links, and a brief description of the pet adoption platform. */}
            <Footer />

        </div>
    );
}

export default Home;