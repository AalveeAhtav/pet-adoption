import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function AddPet() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
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

    const [uploadedImage, setUploadedImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setUploadedImage("");
        setFormData((prev) => ({
            ...prev,
            image: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user || user.role !== "admin") {
            return;
        }

        const existingPets = JSON.parse(localStorage.getItem("pets")) || [];

        let nextId = 1;
        if (existingPets.length > 0) {
            nextId =
                Math.max(...existingPets.map((pet) => Number(pet.id) || 0)) + 1;
        }

        const newPet = {
            id: nextId,
            ...formData,
            image: uploadedImage || formData.image,
        };

        const updatedPets = [...existingPets, newPet];
        localStorage.setItem("pets", JSON.stringify(updatedPets));

        setSuccessMessage("Pet added successfully.");

        setFormData({
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

        setUploadedImage("");
    };

    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            <section className="mx-auto max-w-3xl px-8 py-16">
                <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <h1 className="text-3xl font-semibold text-[#123826]">
                        Add a Pet
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Fill out the pet details below. The pet ID will be generated automatically.
                    </p>

                    {successMessage && (
                        <div className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-green-700">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Pet name"
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        />

                        <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            placeholder="Breed"
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        />

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </select>

                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        />

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            required
                        >
                            <option value="">Select Location</option>
                            <option value="Dallas, TX">Dallas, TX</option>
                            <option value="Plano, TX">Plano, TX</option>
                            <option value="Richardson, TX">Richardson, TX</option>
                            <option value="Garland, TX">Garland, TX</option>
                            <option value="McKinney, TX">McKinney, TX</option>
                            <option value="Frisco, TX">Frisco, TX</option>
                            <option value="Irving, TX">Irving, TX</option>
                        </select>

                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                        />

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826]"
                            />
                        </div>

                        {(uploadedImage || formData.image) && (
                            <div className="md:col-span-2">
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-700">
                                        Image Preview
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                    >
                                        Remove Image
                                    </button>
                                </div>

                                <img
                                    src={uploadedImage || formData.image}
                                    alt="Preview"
                                    className="h-60 w-full rounded-2xl object-cover"
                                />
                            </div>
                        )}

                        <select
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                            required
                        >
                            <option value="">Select purpose</option>
                            <option value="adoption">Adoption</option>
                            <option value="foster">Foster</option>
                            <option value="adoption/foster">Adoption/Foster</option>
                        </select>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows="5"
                            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#123826] md:col-span-2"
                            required
                        />

                        <button
                            type="submit"
                            className="rounded-xl bg-[#123826] px-6 py-3 font-medium text-white transition hover:opacity-90 md:col-span-2"
                        >
                            Add Pet
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AddPet;