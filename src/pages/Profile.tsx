import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    pin: profile?.pin || '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Please log in to view your profile.</div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile({ ...profile, ...form });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Pin Code</label>
            <input
              type="text"
              name="pin"
              value={form.pin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Admin Access</label>
            <input
              type="text"
              value={profile.is_admin ? 'Yes' : 'No'}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          {success && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mt-2 text-center font-semibold">
              Profile updated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 