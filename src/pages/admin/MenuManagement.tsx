import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  available: boolean
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'burgers',
    image_url: '',
    available: true
  })

  const categories = ['burgers', 'sides', 'drinks', 'desserts']

  const defaultImages: Record<string, string> = {
    Pizza: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
    'KFC Style Chicken': 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg',
    Frankie: 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg',
    'French Fries': 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400',
    Burgers: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400',
    Sides: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
    Drinks: 'https://images.pexels.com/photos/593836/pexels-photo-593836.jpeg?auto=compress&w=400',
    Desserts: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400',
  };

  const getDefaultImage = (category: string) => defaultImages[category] || defaultImages['Pizza'];

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        image_url: formData.image_url.trim() || getDefaultImage(formData.category),
      }

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([itemData])
        
        if (error) throw error
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'burgers',
        image_url: '',
        available: true
      })
      setShowForm(false)
      setEditingItem(null)
      fetchMenuItems()
    } catch (error) {
      console.error('Error saving menu item:', error)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url,
      available: item.available
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .eq('id', id)
        
        if (error) throw error
        fetchMenuItems()
      } catch (error) {
        console.error('Error deleting menu item:', error)
      }
    }
  }

  const toggleAvailability = async (id: string, available: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ available })
        .eq('id', id)
      
      if (error) throw error
      fetchMenuItems()
    } catch (error) {
      console.error('Error updating availability:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingItem(null)
            setFormData({
              name: '',
              description: '',
              price: '',
              category: 'burgers',
              image_url: '',
              available: true
            })
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
              
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="mr-2"
                />
                Available
              </label>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
              src={item.image_url && item.image_url.trim() !== '' ? item.image_url : getDefaultImage(item.category)}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="flex justify-between items-center mb-4 mt-auto">
                <span className="text-xl font-bold text-orange-500">₹{item.price}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => toggleAvailability(item.id, !item.available)}
                  className={`flex-1 py-2 rounded-lg transition-colors ${item.available ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  {item.available ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}