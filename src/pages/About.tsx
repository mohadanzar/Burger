

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-100 via-white to-orange-50 py-16 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-orange-600 mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-xl text-gray-700 mb-6 font-medium">
            Welcome to <span className="font-bold text-orange-500">Burger Palace</span> – where every meal is a celebration! We blend the best of Indian and international flavors to serve you happiness on every plate.
          </p>
          <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=800" alt="Delicious Food" className="mx-auto rounded-2xl shadow-lg w-full max-w-lg mb-4" />
        </div>
      </section>

      {/* Our Story & Menu */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Story</h2>
          <p className="text-gray-700 text-lg">
            Founded by passionate food lovers, our restaurant is dedicated to quality, taste, and customer satisfaction. From humble beginnings, we have grown into a favorite spot for families, friends, and foodies who crave variety and excellence.
          </p>
        </div>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Signature Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400" alt="Pizza" className="w-24 h-24 object-cover rounded-full mb-3" />
              <h3 className="font-semibold text-lg text-orange-600 mb-1">Pizza</h3>
              <p className="text-gray-600 text-center">From classic Margherita to spicy Chettinad Chicken, our pizzas are loaded with fresh toppings and gooey cheese.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400" alt="KFC Style Chicken" className="w-24 h-24 object-cover rounded-full mb-3" />
              <h3 className="font-semibold text-lg text-orange-600 mb-1">KFC Style Chicken</h3>
              <p className="text-gray-600 text-center">Crispy, juicy, and perfectly seasoned fried chicken, lollipops, and leg pieces for every chicken lover.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400" alt="Frankie" className="w-24 h-24 object-cover rounded-full mb-3" />
              <h3 className="font-semibold text-lg text-orange-600 mb-1">Frankie</h3>
              <p className="text-gray-600 text-center">Soft rolls stuffed with flavorful fillings like tandoori chicken, paneer, and veggies – perfect for a quick bite.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400" alt="French Fries" className="w-24 h-24 object-cover rounded-full mb-3" />
              <h3 className="font-semibold text-lg text-orange-600 mb-1">French Fries</h3>
              <p className="text-gray-600 text-center">Golden, crispy fries in classic, spicy, peri peri, and cheesy varieties.</p>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Wide variety of menu options for every craving</li>
            <li>Fresh, high-quality ingredients</li>
            <li>Friendly and fast service</li>
            <li>Clean, comfortable, and family-friendly environment</li>
            <li>Easy online ordering and quick delivery</li>
          </ul>
        </div>
        {/* Team Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Chef" className="w-20 h-20 rounded-full mb-3 border-4 border-orange-200" />
              <h3 className="font-semibold text-lg text-orange-600">Himmad Ameen T I</h3>
              <p className="text-gray-600 text-center">Head Chef</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Manager" className="w-20 h-20 rounded-full mb-3 border-4 border-orange-200" />
              <h3 className="font-semibold text-lg text-orange-600">Mohammed Anzar O</h3>
              <p className="text-gray-600 text-center">Restaurant Manager</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Delivery" className="w-20 h-20 rounded-full mb-3 border-4 border-orange-200" />
              <h3 className="font-semibold text-lg text-orange-600">Mohammed Affan K</h3>
              <p className="text-gray-600 text-center">Delivery Lead</p>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-12">
          <span className="inline-block bg-orange-100 text-orange-700 px-8 py-4 rounded-full text-2xl font-bold shadow-lg">Come, taste the difference at Burger Palace!</span>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
} 