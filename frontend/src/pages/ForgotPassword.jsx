import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../lib/apiClient";

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await apiClient.post("/auth/forgot-password", {
                email: formData.email,
                newPassword: formData.newPassword,
            });

            setSuccess(true);
            setFormData({
                email: "",
                newPassword: "",
            });
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message ||
                    "Unable to reset password right now. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">
                <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:p-10">
                    
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold">
                            Reset Password
                        </h1>
                        <p className="mt-3 text-sm text-gray-500">
                            Enter your email and a new password.
                        </p>
                    </div>

                    {!success ? (
                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    New Password
                                </label>

                                <div className="relative">
                                    <input
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#1f5c3f] hover:text-[#174a32]">
                                        {showPassword ? "Hide" : "Show"}

                                    </button>
                                </div>  
                            </div>

                            {errorMessage ? (
                                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {errorMessage}
                                </p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-2xl bg-[#1f5c3f] py-3 text-white hover:bg-[#174a32]"
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8 text-center">
                            <p className="text-lg font-medium text-[#1f5c3f]">
                                Password reset successful!
                            </p>
                            <Link
                                to="/login"
                                className="mt-6 inline-block w-full rounded-2xl bg-[#1f5c3f] py-3 text-white hover:bg-[#174a32]"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-[#1f5c3f] hover:text-[#174a32]"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ForgotPassword;