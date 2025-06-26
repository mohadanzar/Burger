import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, MapPin, User } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function Checkout() {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  
  const { state, dispatch } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const subtotal = state.total
  const tax = subtotal * 0.085
  const deliveryFee = 2.99
  const total = subtotal + tax + deliveryFee

  React.useEffect(() => {
    if (profile) {
      setCustomerInfo(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || ''
      }))
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            total_amount: total,
            status: 'pending',
            payment_status: 'pending'
          }
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      dispatch({ type: 'CLEAR_CART' })
      
      // Navigate to success page
      navigate(`/order-success/${order.id}`)
      
    } catch (error) {
      console.error('Error processing order:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold">Customer Information</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </form>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Credit/Debit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Cash on Delivery
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-700">
                      Card payment will be processed securely through our payment gateway.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8.5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}