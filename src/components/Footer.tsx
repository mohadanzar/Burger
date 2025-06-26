import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍔</span>
              </div>
              <span className="text-xl font-bold">Burger Palace</span>
            </div>
            <p className="text-gray-400 mb-4">
              Serving the best burgers in town since 2020. Made with fresh ingredients and love.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">123 Food Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">info@burgerpalace.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div className="text-gray-400">
                  <div>Mon-Thu: 11AM-10PM</div>
                  <div>Fri-Sat: 11AM-11PM</div>
                  <div>Sunday: 12PM-9PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/menu" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Menu
              </a>
              <a href="/about" className="block text-gray-400 hover:text-orange-500 transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Contact
              </a>
              <a href="/privacy" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Burger Palace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}