import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Order {
  id: string
  user_id: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
  profiles: {
    full_name: string
    email: string
  }
  order_items: {
    quantity: number
    price: number
    menu_items: {
      name: string
    }
  }[]
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles (full_name, email),
          order_items (
            quantity,
            price,
            menu_items (name)
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

      if (error) throw error
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-blue-100 text-blue-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'preparing': return <Clock className="w-4 h-4" />
      case 'ready': return <CheckCircle className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.id.slice(0, 8)}
                </h3>
                <p className="text-gray-600">
                  Customer: {order.profiles?.full_name} ({order.profiles?.email})
                </p>
                <p className="text-gray-600">
                  Ordered: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  ${order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
              <div className="space-y-1">
                {order.order_items?.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    {item.quantity}x {item.menu_items?.name} - ${(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="flex space-x-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Start Preparing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel Order
                  </button>
                </>
              )}
              
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Mark as Ready
                </button>
              )}
              
              {order.status === 'ready' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}