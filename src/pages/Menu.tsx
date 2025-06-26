import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  available: boolean
}

const defaultImages: Record<string, string> = {
  Pizza: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
  'KFC Style Chicken': 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg',
  Frankie: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg',
  'French Fries': 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400',
  Burgers: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400',
  Sides: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
  Drinks: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400',
  Desserts: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400',
}

const getDefaultImage = (category: string) => defaultImages[category] || defaultImages['Pizza']

const demoMenuItems: MenuItem[] = [
  // Pizza
  { id: 'pizza1', name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 199, category: 'Pizza', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'pizza2', name: 'Pepperoni Pizza', description: 'Pepperoni and cheese', price: 249, category: 'Pizza', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'pizza3', name: 'Veggie Pizza', description: 'Loaded with veggies', price: 229, category: 'Pizza', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'pizza4', name: 'BBQ Chicken Pizza', description: 'BBQ sauce and chicken', price: 259, category: 'Pizza', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'pizza5', name: 'Paneer Tikka Pizza', description: 'Indian style paneer', price: 239, category: 'Pizza', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  // KFC Style Chicken
  { id: 'kfc1', name: 'Classic KFC Chicken', description: 'Crispy fried chicken', price: 199, category: 'KFC Style Chicken', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg', available: true },
  { id: 'kfc2', name: 'Spicy KFC Wings', description: 'Spicy fried wings', price: 179, category: 'KFC Style Chicken', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg', available: true },
  { id: 'kfc3', name: 'KFC Chicken Lollipop', description: 'Juicy chicken lollipops', price: 159, category: 'KFC Style Chicken', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg', available: true },
  { id: 'kfc4', name: 'KFC Leg Piece', description: 'Tender leg pieces', price: 189, category: 'KFC Style Chicken', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg', available: true },
  { id: 'kfc5', name: 'KFC Family Bucket', description: 'Bucket of fried chicken', price: 499, category: 'KFC Style Chicken', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg', available: true },
  // Frankie
  { id: 'frankie1', name: 'Paneer Frankie', description: 'Paneer stuffed roll', price: 99, category: 'Frankie', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg', available: true },
  { id: 'frankie2', name: 'Chicken Frankie', description: 'Chicken stuffed roll', price: 119, category: 'Frankie', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg', available: true },
  { id: 'frankie3', name: 'Veg Frankie', description: 'Veggie stuffed roll', price: 89, category: 'Frankie', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg', available: true },
  { id: 'frankie4', name: 'Egg Frankie', description: 'Egg stuffed roll', price: 109, category: 'Frankie', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg', available: true },
  { id: 'frankie5', name: 'Cheese Frankie', description: 'Cheese stuffed roll', price: 129, category: 'Frankie', image_url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg', available: true },
  // French Fries
  { id: 'fries1', name: 'Classic Fries', description: 'Golden crispy fries', price: 59, category: 'French Fries', image_url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400', available: true },
  { id: 'fries2', name: 'Peri Peri Fries', description: 'Spicy peri peri fries', price: 69, category: 'French Fries', image_url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400', available: true },
  { id: 'fries3', name: 'Cheese Fries', description: 'Fries with cheese', price: 79, category: 'French Fries', image_url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400', available: true },
  { id: 'fries4', name: 'Masala Fries', description: 'Indian masala fries', price: 69, category: 'French Fries', image_url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400', available: true },
  { id: 'fries5', name: 'Loaded Fries', description: 'Fries loaded with toppings', price: 99, category: 'French Fries', image_url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400', available: true },
  // Burgers
  { id: 'burger1', name: 'Classic Burger', description: 'Juicy beef burger', price: 149, category: 'Burgers', image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400', available: true },
  { id: 'burger2', name: 'Chicken Burger', description: 'Crispy chicken burger', price: 159, category: 'Burgers', image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400', available: true },
  { id: 'burger3', name: 'Veggie Burger', description: 'Loaded veggie burger', price: 139, category: 'Burgers', image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400', available: true },
  { id: 'burger4', name: 'Cheese Burger', description: 'Burger with cheese', price: 169, category: 'Burgers', image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400', available: true },
  { id: 'burger5', name: 'Paneer Burger', description: 'Indian paneer burger', price: 159, category: 'Burgers', image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400', available: true },
  // Sides
  { id: 'sides1', name: 'Onion Rings', description: 'Crispy onion rings', price: 79, category: 'Sides', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'sides2', name: 'Garlic Bread', description: 'Toasted garlic bread', price: 59, category: 'Sides', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'sides3', name: 'Coleslaw', description: 'Creamy coleslaw', price: 49, category: 'Sides', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'sides4', name: 'Potato Wedges', description: 'Spiced potato wedges', price: 69, category: 'Sides', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  { id: 'sides5', name: 'Mozzarella Sticks', description: 'Cheesy mozzarella sticks', price: 99, category: 'Sides', image_url: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400', available: true },
  // Drinks
  { id: 'drink1', name: 'Coke', description: 'Chilled Coca-Cola', price: 39, category: 'Drinks', image_url: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400', available: true },
  { id: 'drink2', name: 'Lemonade', description: 'Fresh lemonade', price: 29, category: 'Drinks', image_url: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400', available: true },
  { id: 'drink3', name: 'Iced Tea', description: 'Refreshing iced tea', price: 35, category: 'Drinks', image_url: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400', available: true },
  { id: 'drink4', name: 'Mango Shake', description: 'Sweet mango shake', price: 49, category: 'Drinks', image_url: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400', available: true },
  { id: 'drink5', name: 'Cold Coffee', description: 'Chilled cold coffee', price: 59, category: 'Drinks', image_url: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400', available: true },
  // Desserts
  { id: 'dessert1', name: 'Chocolate Cake', description: 'Rich chocolate cake', price: 99, category: 'Desserts', image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400', available: true },
  { id: 'dessert2', name: 'Ice Cream', description: 'Vanilla ice cream', price: 59, category: 'Desserts', image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400', available: true },
  { id: 'dessert3', name: 'Brownie', description: 'Chocolate brownie', price: 79, category: 'Desserts', image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400', available: true },
  { id: 'dessert4', name: 'Gulab Jamun', description: 'Indian sweet', price: 69, category: 'Desserts', image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400', available: true },
  { id: 'dessert5', name: 'Cheesecake', description: 'Creamy cheesecake', price: 109, category: 'Desserts', image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400', available: true },
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { dispatch } = useCart()
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'Pizza', 'KFC Style Chicken', 'Frankie', 'French Fries', 'Burgers', 'Sides', 'Drinks', 'Desserts']

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true })
      if (!error && data && data.length > 0) setMenuItems(data)
      else setMenuItems(demoMenuItems)
      setLoading(false)
    }
    fetchMenuItems()
  }, [])

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory).slice(0, 5)

  const addToCart = (item: MenuItem) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image_url: item.image_url
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Delicious food made with love and fresh ingredients</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize font-medium transition-colors m-1 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={item.image_url && item.image_url.trim() !== '' ? item.image_url : getDefaultImage(item.category)} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}