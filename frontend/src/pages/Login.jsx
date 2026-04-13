import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        rememberMe: false,
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    /* send user back to the page they were trying to visit before login */
    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        /* fake login for now through auth context */
        const didLogin = login(formData.identifier, formData.password);

        /* after login, return user to the protected page they wanted */
        if (didLogin) {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">
                <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:p-10">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-[#1f1f1f]">
                            Welcome Back
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Log in to manage your adoption applications and explore available pets.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label
                                htmlFor="identifier"
                                className="mb-2 block text-sm font-medium text-[#1f1f1f]"
                            >
                                Email or Username
                            </label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                value={formData.identifier}
                                onChange={handleChange}
                                placeholder="Enter your email or username"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-[#1f1f1f]"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="accent-[#1f5c3f]"
                                />
                                Remember me
                            </label>

                            <a
                                href="#"
                                className="font-medium text-[#1f5c3f] hover:text-[#174a32]"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 rounded-2xl bg-[#f7f7f3] px-4 py-3 text-sm text-gray-600">
                        <p className="font-medium text-[#123826]">Demo logins</p>
                        <p className="mt-2">User: <span className="font-medium">user</span> or <span className="font-medium">test@example.com</span></p>
                        <p>Password: <span className="font-medium">1234</span></p>
                        <p className="mt-2">Admin: <span className="font-medium">admin</span> or <span className="font-medium">admin@petadoption.com</span></p>
                        <p>Password: <span className="font-medium">admin123</span></p>
                    </div>

                    {/* redirect */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-[#1f5c3f] hover:text-[#174a32]"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Login;