import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import Footer from "../components/Footer";
import heroImage from "../assets/hero_cat.jpg";

function Home() {
    const featuredPets = [
            {
            id: 1,
            name: "Max",
            breed: "Golden Retriever",
            age: "2 Years",
            image:
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
            },
            {
            id: 2,
            name: "Bella",
            breed: "Labrador",
            age: "1 Year",
            image:
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
            },
            {
            id: 3,
            name: "Oliver",
            breed: "Tabby Cat",
            age: "3 Years",
            image:
                "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80",
            },
            {
            id: 4,
            name: "Daisy",
            breed: "Beagle",
            age: "2 Years",
            image:
                "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
            },
        ];

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

        return (
            <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
                <Navbar />

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
                                <button className="rounded-2xl bg-white px-6 py-3 font-medium text-[#1f5c3f] shadow-sm hover:bg-white/70 cursor-pointer">
                                    Browse Pets
                                </button>

                                <button className="rounded-2xl border border-white px-6 py-3 font-medium text-white hover:bg-white hover:text-[#1f5c3f] cursor-pointer">
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
                        <SearchCard />
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-8 py-24">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Featured Pets</h2>
                        <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium">
                            View All Pets
                        </button>
                    </div>

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
                                    <span className="rounded-full bg-[#f4f4f4] px-3 py-1 text-sm text-gray-600">
                                        Vaccinated
                                    </span>
                                    </div>

                                    <button className="mt-5 w-full rounded-xl bg-[#1f5c3f] py-3 font-medium text-white hover:bg-[#174a32] cursor-pointer">
                                    View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

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

                <section className="mx-auto max-w-7xl px-8 pb-24">
                    <div className="rounded-[28px] bg-[#1f5c3f] px-8 py-12 text-white">
                        <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
                        <p className="mt-4 max-w-6xl leading-8 text-white/85">
                            We are dedicated to connecting loving homes with pets in need. Our platform offers a wide variety of adoptable pets, easy-to-use search filters, and a supportive adoption process. Join our community of pet lovers and give a deserving pet a forever home today!
                        </p>
                    </div>
                </section>

                <Footer />

            </div>
        );
    }

export default Home;