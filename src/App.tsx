import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/admin/AdminDashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import OrderSuccess from './pages/OrderSuccess'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/admin-login" element={<AdminLogin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App