import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Plus, Package, Users, BarChart3, Settings, Edit, Trash2, Eye, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/api.js';
import { useAuth } from '@/contexts/AuthContext';

// Import sweet images
import rasagullaImage from '@/assets/rasgulla.jpg';
import gulabJamunImage from '@/assets/gulab-jamun.jpg';
import laddooImage from '@/assets/laddoo.jpg';
import kajuKatliImage from '@/assets/kaju-katli.jpg';
import mysorePakImage from '@/assets/mysore-pak.jpg';
import modakImage from '@/assets/modak.jpg';
import ghewarImage from '@/assets/ghewar.jpg';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantityInStock: '',
    description: ''
  });

  // Image mapping for sweets
  const imageMap = {
    'rasgulla': rasagullaImage,
    'gulab jamun': gulabJamunImage,
    'motichoor laddoo': laddooImage,
    'laddoo': laddooImage,
    'kaju katli': kajuKatliImage,
    'mysore pak': mysorePakImage,
    'modak': modakImage,
    'ghewar': ghewarImage,
    'sandesh': rasagullaImage
  };

  const getImageForSweet = (sweetName) => {
    const name = sweetName.toLowerCase();
    return imageMap[name] || rasagullaImage;
  };

  useEffect(() => {
    if (activeTab === 'sweets') {
      fetchSweets();
    }
  }, [activeTab]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await api.get('/sweets');
      setSweets(data || []);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingSweet) {
        await api.put(`/sweets/${editingSweet._id}`, formData);
        alert('Sweet updated successfully!');
      } else {
        await api.post('/sweets', formData);
        alert('Sweet added successfully!');
      }
      resetForm();
      fetchSweets();
    } catch (error) {
      console.error('Error saving sweet:', error);
      alert(error.data?.message || 'Failed to save sweet');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantityInStock: sweet.quantityInStock.toString(),
      description: sweet.description || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (sweetId) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;
    
    try {
      await api.delete(`/sweets/${sweetId}`);
      alert('Sweet deleted successfully!');
      fetchSweets();
    } catch (error) {
      console.error('Error deleting sweet:', error);
      alert(error.data?.message || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (sweetId) => {
    const quantity = prompt('Enter quantity to add:');
    if (!quantity || isNaN(quantity)) return;
    
    try {
      await api.post(`/sweets/${sweetId}/restock`, { quantity: parseInt(quantity) });
      alert('Stock updated successfully!');
      fetchSweets();
    } catch (error) {
      console.error('Error restocking:', error);
      alert(error.data?.message || 'Failed to update stock');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', quantityInStock: '', description: '' });
    setEditingSweet(null);
    setShowAddForm(false);
  };

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sweets', label: 'Manage Sweets', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
            <p className="text-sm text-secondary">Welcome, {user?.name}</p>
          </div>
          <nav className="p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                    activeTab === item.id
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Total Sweets</h3>
                      <p className="text-2xl font-bold text-blue-900">{sweets.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">In Stock</h3>
                      <p className="text-2xl font-bold text-green-900">
                        {sweets.filter(s => s.quantityInStock > 0).length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-br from-orange-50 to-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-orange-800 mb-1">Low Stock</h3>
                      <p className="text-2xl font-bold text-orange-900">
                        {sweets.filter(s => s.quantityInStock < 5 && s.quantityInStock > 0).length}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-br from-red-50 to-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">Out of Stock</h3>
                      <p className="text-2xl font-bold text-red-900">
                        {sweets.filter(s => s.quantityInStock === 0).length}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">System running smoothly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Database connected successfully</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Admin panel ready for use</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sweets' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Sweets</h1>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Sweet
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search sweets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Add/Edit Form Modal */}
              {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6">
                      {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Sweet name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">Category *</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select category</option>
                          <option value="bengali">Bengali</option>
                          <option value="rajasthani">Rajasthani</option>
                          <option value="gujarati">Gujarati</option>
                          <option value="punjabi">Punjabi</option>
                          <option value="south-indian">South Indian</option>
                          <option value="maharashtrian">Maharashtrian</option>
                          <option value="fusion">Fusion/Modern</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">Price (₹) *</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Price in rupees"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">Quantity in Stock *</label>
                        <input
                          type="number"
                          name="quantityInStock"
                          value={formData.quantityInStock}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Available quantity"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Sweet description"
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 btn btn-primary"
                        >
                          {loading ? 'Saving...' : (editingSweet ? 'Update' : 'Add Sweet')}
                        </button>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="flex-1 btn border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Sweets Table */}
              <div className="card overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-secondary">Loading sweets...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Sweet</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Category</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Stock</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredSweets.map((sweet) => (
                          <tr key={sweet._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={getImageForSweet(sweet.name)}
                                  alt={sweet.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-semibold">{sweet.name}</div>
                                  <div className="text-sm text-secondary truncate max-w-xs">
                                    {sweet.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                {sweet.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold">₹{sweet.price}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                sweet.quantityInStock === 0
                                  ? 'bg-red-100 text-red-800'
                                  : sweet.quantityInStock < 5
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {sweet.quantityInStock} units
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(sweet)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRestock(sweet._id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Restock"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(sweet._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredSweets.length === 0 && (
                      <div className="p-8 text-center text-secondary">
                        No sweets found. {searchQuery && 'Try adjusting your search.'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold mb-8">User Management</h1>
              <div className="card p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-secondary">User management features will be implemented here.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Settings</h1>
              <div className="card p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">System Settings</h3>
                <p className="text-secondary">System configuration options will be available here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;