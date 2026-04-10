//main homepage for the pet adoption website. It includes a hero section, featured pets, and an explanation of the adoption process.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import Footer from "../components/Footer";
import heroImage from "../assets/hero_cat.jpg";

function Home() {
    const navigate = useNavigate();

    // These are dummy data so that I could quickly build the UI. The actual data would come from an API or database.
    const featuredPets = [
            {
            id: 1,
            name: "Max",
            breed: "Golden Retriever",
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
            age: "2 Years",
            gender: "Female",
            location: "Garland, TX",
            purpose: "adoption",
            description: "Daisy is energetic, sweet, and always excited to meet new people. She would do well with a family that can give her playtime, attention, and a loving forever home.",
            image:
                "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
            },
        ];

    //steps for the adoption process
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
            title: "Start Adopting",
            text: "Submit your application and begin the adoption process with confidence.",
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

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate("/pets")}
                                    className="rounded-2xl bg-white px-6 py-3 font-medium text-[#1f5c3f] shadow-sm hover:bg-white/70 cursor-pointer"
                                >
                                    Browse Pets
                                </button>

                                <button
                                    onClick={() => navigate("/pets?purpose=adoption")}
                                    className="rounded-2xl border border-white px-6 py-3 font-medium text-white hover:bg-white hover:text-[#1f5c3f] cursor-pointer"
                                >
                                    Start Adopting
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
                                        {pet.purpose === "adoption" ? "Adoption" : "Foster"}
                                    </span>
                                    </div>

                                    <button
                                        onClick={() => setSelectedPet(pet)}
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
                    <h2 className="text-3xl font-semibold">How Adoption Works</h2>

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
                            We are dedicated to connecting loving homes with pets in need. Our platform offers a wide variety of adoptable pets, easy-to-use search filters, and a supportive adoption process. Join our community of pet lovers and give a deserving pet a forever home today!
                        </p>
                    </div>
                </section>

                {/* pet details modal section. It opens when the user clicks view details and shows the pet description with the correct adoption or foster button. */}
                {selectedPet && (
                    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/50 px-4">
                        <div className="relative w-full max-w-2xl animate-[modalPop_0.25s_ease-out] rounded-[28px] bg-white p-6 shadow-2xl md:p-8">

                            <button
                                onClick={() => setSelectedPet(null)}
                                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-600 shadow-md hover:bg-gray-100 cursor-pointer"
                            >
                                ×
                            </button>

                            <img
                                src={selectedPet.image}
                                alt={selectedPet.name}
                                className="mt-4 h-72 w-full rounded-[20px] object-cover"
                            />

                            <div className="mt-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-3xl font-semibold">{selectedPet.name}</h3>
                                    <span className="rounded-full bg-[#e8f1ec] px-3 py-1 text-sm font-medium text-[#1f5c3f]">
                                        {selectedPet.purpose === "adoption" ? "Adoption" : "Foster"}
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
                                        : "Available for Foster"}
                                </p>

                                <button className="mt-4 w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer">
                                    {selectedPet.purpose === "adoption"
                                        ? "Apply for Adoption"
                                        : "Apply for Foster"}
                                </button>
                            </div>
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