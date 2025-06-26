import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { BarChart3, Package, ShoppingCart, Users, Plus } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import MenuManagement from './MenuManagement'
import OrderManagement from './OrderManagement'

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  available: boolean;
}

export default function AdminDashboard() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0,
    pendingOrders: 0
  })
  const [latestMenuItems, setLatestMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    if (profile?.is_admin) {
      fetchStats()
      fetchLatestMenuItems()
    }
  }, [profile])

  const fetchStats = async () => {
    try {
      // Fetch orders stats
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, status')

      // Fetch menu items count
      const { count: menuCount } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true })

      if (orders) {
        setStats({
          totalOrders: orders.length,
          totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
          totalMenuItems: menuCount || 0,
          pendingOrders: orders.filter(order => order.status === 'pending').length
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchLatestMenuItems = async () => {
    try {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8)
      if (data) setLatestMenuItems(data)
    } catch (error) {
      console.error('Error fetching latest menu items:', error)
    }
  }

  if (!user || !profile?.is_admin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile.full_name}</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <Link 
              to="/admin" 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/menu" 
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Menu Management
            </Link>
            <Link 
              to="/admin/orders" 
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Order Management
            </Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Menu Items</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalMenuItems}</p>
                    </div>
                    <Package className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
                    </div>
                    <Users className="w-12 h-12 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link 
                    to="/admin/menu" 
                    className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-orange-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Add Menu Item</h3>
                      <p className="text-sm text-gray-600">Add new items to your menu</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/admin/orders" 
                    className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <ShoppingCart className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">View Orders</h3>
                      <p className="text-sm text-gray-600">Manage customer orders</p>
                    </div>
                  </Link>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-green-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">View Reports</h3>
                      <p className="text-sm text-gray-600">Analyze sales data</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Menu Items */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Menu Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {latestMenuItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                      <img
                        src={item.image_url && item.image_url.trim() !== '' ? item.image_url : (item.category === 'Pizza' ? 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400' : item.category === 'KFC Style Chicken' ? 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Chicken-Leg-Piece-500x500.jpg' : item.category === 'Frankie' ? 'https://www.cookwithmanali.com/wp-content/uploads/2014/12/Paneer-Frankie-500x500.jpg' : item.category === 'French Fries' ? 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400' : 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=400')}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 text-center">{item.name}</h3>
                      <p className="text-orange-600 font-bold text-lg mt-1">₹{item.price}</p>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium capitalize mt-2">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          } />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  )
}