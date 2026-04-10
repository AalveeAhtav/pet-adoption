import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
    return (
        <div className="min-h-screen bg-[#f8f8f6] text-[#1f1f1f]">
            <Navbar />

            <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">
                <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:p-10">
                    
                    {/* heading */}
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-[#1f1f1f]">
                            Create an Account
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Join our community and start your pet adoption journey today.
                        </p>
                    </div>

                    {/* form */}
                    <form className="mt-8 space-y-5">
                        
                        {/* full name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                            />
                        </div>

                        {/* email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                            />
                        </div>

                        {/* password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                            />
                        </div>

                        {/* confirm password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full rounded-2xl border border-gray-200 bg-[#f8f8f6] px-4 py-3 outline-none transition focus:border-[#1f5c3f] focus:ring-2 focus:ring-[#1f5c3f]/20"
                            />
                        </div>

                        {/* terms */}
                        <label className="flex items-start gap-2 text-sm text-gray-600">
                            <input type="checkbox" className="mt-1 accent-[#1f5c3f]" />
                            I agree to the Terms & Conditions
                        </label>

                        {/* button */}
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#1f5c3f] py-3 font-medium text-white transition hover:bg-[#174a32] cursor-pointer"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* redirect */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-medium text-[#1f5c3f] hover:text-[#174a32]"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Signup;