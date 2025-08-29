import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-black/70 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14 text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Career Tests", "Counselling", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@example.com</li>
              <li>🏢 123 Learning St, New Delhi, India</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-blue-600 transition"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-pink-500 transition"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-3 text-gray-400">
              Subscribe to get our latest updates and resources.
            </p>
            <form className="flex items-center bg-white/10 rounded-xl w-fit  overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className=" flex-1 px-4 py-3 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-fit px-5 py-3 bg-blue-600 hover:bg-blue-500 transition text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
