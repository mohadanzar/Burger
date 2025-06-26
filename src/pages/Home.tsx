import { Link } from 'react-router-dom'
import { Star, Truck, Clock, Award } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function Home() {
  const { dispatch } = useCart()

  const features = [
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Premium Quality",
      description: "Fresh ingredients sourced daily from local suppliers"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Fast Delivery",
      description: "Hot and fresh delivery within 30 minutes"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Quick Service",
      description: "Skip the line with our online ordering system"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Award Winning",
      description: "Best burger in the city for 3 consecutive years"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-orange-500 to-red-600 flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            The Best Burgers
            <br />
            <span className="text-orange-400">In Town</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Crafted with love, served with passion. Experience the perfect blend of taste and quality.
          </p>
          <div className="space-x-4">
            <Link 
              to="/menu" 
              className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 inline-block"
            >
              Order Now
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best burger experience with quality ingredients and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Items</h2>
            <p className="text-xl text-gray-600">Try our customer favorites</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Classic Cheeseburger",
                price: "₹199",
                image: "https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "BBQ Bacon Burger",
                price: "₹249",
                image: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Crispy Chicken Burger",
                price: "₹219",
                image: "https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              // KFC Style Chicken
              {
                name: "KFC Style Chicken Bucket",
                price: "₹399",
                image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "KFC Spicy Chicken Wings",
                price: "₹249",
                image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "KFC Crispy Chicken Strips",
                price: "₹199",
                image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              // Sandwiches
              {
                name: "Grilled Veg Sandwich",
                price: "₹129",
                image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Chicken Club Sandwich",
                price: "₹179",
                image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Paneer Tikka Sandwich",
                price: "₹149",
                image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">{item.price}</span>
                    <button 
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                      onClick={() => {
                        dispatch({
                          type: 'ADD_ITEM',
                          payload: {
                            id: item.name.replace(/\s+/g, '-').toLowerCase(),
                            name: item.name,
                            price: Number(item.price.replace(/[^\d.]/g, '')),
                            quantity: 1,
                            image_url: item.image
                          }
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/menu" 
              className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of satisfied customers and taste the difference today.
          </p>
          <Link 
            to="/menu" 
            className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  )
}