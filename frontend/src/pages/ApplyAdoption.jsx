import { Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ApplyAdoption() {
    const { petId } = useParams();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        customerId: user?.customerId || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        petId: petId || "",
        reason: "",
        housing: "",
        address: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const location = useLocation();
    const pet = location.state;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingApplications =
            JSON.parse(localStorage.getItem("applications")) || [];

        const applicationData = {
            id: Date.now(),
            type: "adoption",
            petId: formData.petId,
            customerId: formData.customerId,
            customerName: formData.fullName,
            customerEmail: formData.email,
            fullName: formData.fullName,
            email: formData.email,
            petName: pet?.name || `Pet #${formData.petId}`,
            petBreed: pet?.breed || "Unknown Breed",
            submittedDate: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            notes: "Application received successfully.",
            status: "Pending",
            reason: formData.reason,
            housing: formData.housing,
            address: formData.address,
        };

        localStorage.setItem(
            "applications",
            JSON.stringify([...existingApplications, applicationData])
        );

        console.log("Adoption Application Submitted:", applicationData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="min-h-screen bg-[#f7f6f2] px-6 py-10 flex items-center justify-center">
                <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <h1 className="text-3xl font-bold text-[#1f5c3f]">
                        Application Successful
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Your application was successful and is now <span className="font-semibold">Pending</span>.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            to="/"
                            className="rounded-xl bg-[#1f5c3f] px-6 py-3 font-medium text-white transition hover:bg-[#174a32]"
                        >
                            Go to Home
                        </Link>

                        <Link
                            to="/applications"
                            className="rounded-xl border border-[#1f5c3f] px-6 py-3 font-medium text-[#1f5c3f] transition hover:bg-[#1f5c3f] hover:text-white"
                        >
                            View My Applications
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f7f6f2] px-6 py-10">
            <div className="mx-auto max-w-2xl">
                <Link
                    to="/pets"
                    className="inline-block rounded-xl bg-[#1f5c3f] px-4 py-2 text-white transition hover:opacity-90"
                >
                    ← Back to Browse Pets
                </Link>

                <div className="mt-8 rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <h1 className="text-4xl font-bold text-[#123826]">
                        Adoption Application
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Pet ID
                            </label>
                            <input
                                type="text"
                                name="petId"
                                value={formData.petId}
                                readOnly
                                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                readOnly
                                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Housing Type
                            </label>
                            <select
                                name="housing"
                                value={formData.housing}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#123826]"
                                required
                            >
                                <option value="">Select housing type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {formData.housing && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter your address"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#123826]"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Why do you want to adopt this pet?
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us why you would be a good match..."
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#123826]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-[#1f5c3f] px-6 py-3 font-medium text-white transition hover:bg-[#0f2f20]"
                        >
                            Apply
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> New applications are
                        submitted with a status of Pending.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ApplyAdoption;