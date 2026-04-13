import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ViewAllApplications() {
    // selected type admin wants to view first
    const [selectedType, setSelectedType] = useState("");

    // load all submitted applications from localStorage
    const [applications, setApplications] = useState(() => {
        return JSON.parse(localStorage.getItem("applications")) || [];
    });

    // keep admin page in sync with latest localStorage data
    useEffect(() => {
        const savedApplications =
            JSON.parse(localStorage.getItem("applications")) || [];
        setApplications(savedApplications);
    }, [selectedType]);

    // handles approving or rejecting an application
    function handleUpdateStatus(applicationId, newStatus) {
        const allApplications = JSON.parse(localStorage.getItem("applications")) || [];

        const updatedApplications = allApplications.map((application) => {
            if (application.id !== applicationId) {
                return application;
            }

            return {
                ...application,
                status: newStatus,
                notes:
                    newStatus === "Approved"
                        ? "Your application has been approved by the admin."
                        : "Your application has been rejected by the admin.",
            };
        });

        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
    }

    // filter applications based on selected type
    const filteredApplications = useMemo(() => {
        if (!selectedType) return [];
        return applications.filter((application) => application.type === selectedType);
    }, [selectedType, applications]);

    // badge color helper
    function getStatusClasses(status) {
        if (status === "Approved") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Rejected") {
            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";
    }

    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-14 md:px-8">
                {/* page heading */}
                <section className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1f5c3f]">
                        Admin Panel
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                        View all customer applications
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                        Review every adoption and foster application submitted by customers.
                    </p>
                </section>

                {/* selection cards */}
                {!selectedType && (
                    <section className="grid gap-6 md:grid-cols-2">
                        <button
                            onClick={() => setSelectedType("adoption")}
                            className="group rounded-[28px] bg-white p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
                        >
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f2ec] text-xl">
                                🐶
                            </div>
                            <h2 className="text-2xl font-semibold text-[#123826]">
                                All Adoption Applications
                            </h2>
                            <p className="mt-3 leading-7 text-gray-600">
                                View every adoption application submitted by all customers.
                            </p>
                            <span className="mt-6 inline-block font-medium text-[#1f5c3f] transition group-hover:translate-x-1">
                                View adoption applications →
                            </span>
                        </button>

                        <button
                            onClick={() => setSelectedType("foster")}
                            className="group rounded-[28px] bg-white p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
                        >
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-xl">
                                🏠
                            </div>
                            <h2 className="text-2xl font-semibold text-[#123826]">
                                All Foster Applications
                            </h2>
                            <p className="mt-3 leading-7 text-gray-600">
                                View every foster application submitted by all customers.
                            </p>
                            <span className="mt-6 inline-block font-medium text-[#1f5c3f] transition group-hover:translate-x-1">
                                View foster applications →
                            </span>
                        </button>
                    </section>
                )}

                {/* application list area */}
                {selectedType && (
                    <section className="rounded-[32px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-8">
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1f5c3f]">
                                    {selectedType === "adoption" ? "Adoption" : "Foster"} Applications
                                </p>
                                <h2 className="mt-2 text-3xl font-semibold text-[#123826]">
                                    {selectedType === "adoption"
                                        ? "All Adoption Applications"
                                        : "All Foster Applications"}
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelectedType("")}
                                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                            >
                                Back
                            </button>
                        </div>

                        {filteredApplications.length > 0 ? (
                            <div className="grid gap-5">
                                {filteredApplications.map((application) => (
                                    <div
                                        key={application.id}
                                        className="rounded-[24px] border border-gray-200 bg-[#fcfcfb] p-5 md:p-6"
                                    >
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-[#123826]">
                                                    {application.petName}
                                                </h3>
                                                <p className="mt-1 text-gray-600">
                                                    {application.petBreed}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(
                                                    application.status
                                                )}`}
                                            >
                                                {application.status}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid gap-3 text-sm text-gray-600 md:grid-cols-2">
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Customer Name:
                                                </span>{" "}
                                                {application.customerName}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Customer ID:
                                                </span>{" "}
                                                {application.customerId}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Email:
                                                </span>{" "}
                                                {application.customerEmail}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Address:
                                                </span>{" "}
                                                {application.address}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Submitted:
                                                </span>{" "}
                                                {application.submittedDate}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-[#1f1f1f]">
                                                    Type:
                                                </span>{" "}
                                                {application.type.charAt(0).toUpperCase() +
                                                    application.type.slice(1)}
                                            </p>
                                        </div>

                                        <p className="mt-4 leading-7 text-gray-700">
                                            {application.notes}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {application.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(application.id, "Approved")
                                                        }
                                                        className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(application.id, "Rejected")
                                                        }
                                                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {application.status === "Approved" && (
                                                <span className="text-sm font-medium text-green-700">
                                                    This application has been accepted.
                                                </span>
                                            )}

                                            {application.status === "Rejected" && (
                                                <span className="text-sm font-medium text-red-700">
                                                    This application has been rejected.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[28px] bg-[#f7f7f3] px-6 py-12 text-center">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
                                    📄
                                </div>

                                <h3 className="text-2xl font-semibold text-[#123826]">
                                    No {selectedType} applications yet
                                </h3>

                                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                                    No customer has submitted any{" "}
                                    {selectedType === "adoption" ? "adoption" : "foster"} applications yet.
                                </p>

                                <div className="mt-6">
                                    <button
                                        onClick={() => setSelectedType("")}
                                        className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
                                    >
                                        Choose Another Option
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default ViewAllApplications;