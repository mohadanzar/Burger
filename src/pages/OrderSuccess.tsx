import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-4">Thank you for your order.</p>
        <p className="text-gray-500 mb-6">Your order number is <span className="font-semibold">{orderId}</span>.</p>
        <div className="flex flex-col gap-3">
          <Link to="/" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">Go to Home</Link>
          <Link to="/orders" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">View My Orders</Link>
        </div>
      </div>
    </div>
  );
} 