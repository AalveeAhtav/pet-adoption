function Footer() {
  return (
    <footer className="bg-[#123826] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-8 py-12 md:grid-cols-3">
            <div>
                <h3 className="text-2xl font-semibold">Pet Adoption</h3>
                <p className="mt-4 leading-7 text-white/80">
                    Connecting loving homes with pets in need. Find your new best friend today!
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold"> Quick Links</h4>
                <ul className="mt-4 space-y-2 text-white/60">
                    <li><a href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">Home</a></li>
                    <li><a href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">Adopt</a></li>
                    <li><a href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">Foster</a></li>
                    <li><a href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">About Us</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Contact Us</h4>
                <ul className="mt-4 text-white/80">
                    <li>Email: supportpedadoption@gmail.com</li>
                    <li>Phone: (123) 456-7890</li>
                    <li>Address: 123 Pet Street, City, State, ZIP</li>
                </ul>
            </div>
        </div>
    </footer>
  );
}

export default Footer