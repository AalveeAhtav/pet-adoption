import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
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

                    <form className="mt-8 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-[#1f1f1f]"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
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
                                type="password"
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="accent-[#1f5c3f]" />
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

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a
                            href="#"
                            className="font-medium text-[#1f5c3f] hover:text-[#174a32]"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Login;