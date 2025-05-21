'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight, Trash2, X, Check, User, Mail, Calendar } from 'lucide-react';

export default function UsersPage() {
  // State for users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      status: 'active',
      plan: 'Premium',
      lastActive: '5 minutes ago',
      conversations: 12,
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      status: 'active',
      plan: 'Premium',
      lastActive: '15 minutes ago',
      conversations: 8,
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      status: 'inactive',
      plan: 'Basic',
      lastActive: '3 days ago',
      conversations: 5,
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      status: 'active',
      plan: 'Basic',
      lastActive: '1 hour ago',
      conversations: 3,
    },
    {
      id: 5,
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@example.com',
      status: 'inactive',
      plan: 'Premium',
      lastActive: '1 week ago',
      conversations: 15,
    },
    {
      id: 6,
      name: 'Robert Miller',
      email: 'robert.miller@example.com',
      status: 'active',
      plan: 'Enterprise',
      lastActive: '30 minutes ago',
      conversations: 22,
    },
    {
      id: 7,
      name: 'Jessica Anderson',
      email: 'jessica.anderson@example.com',
      status: 'active',
      plan: 'Basic',
      lastActive: '2 hours ago',
      conversations: 1,
    },
    {
      id: 8,
      name: 'Thomas Martinez',
      email: 'thomas.martinez@example.com',
      status: 'active',
      plan: 'Premium',
      lastActive: '45 minutes ago',
      conversations: 7,
    },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filters
  const [filters, setFilters] = useState({
    status: '',
    plan: ''
  });
  
  // State for showing filter modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // State for add user modal
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  // State for new user form
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    status: 'active',
    plan: 'Basic'
  });
  
  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      filters.status === '' ||
      user.status === filters.status;
    
    // Plan filter
    const matchesPlan = 
      filters.plan === '' ||
      user.plan === filters.plan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  // Handle adding a new user
  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email) return;
    
    // Create new user object
    const newUserObj = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status,
      plan: newUser.plan,
      lastActive: 'Just now',
      conversations: 0
    };
    
    // Add to users array
    setUsers([...users, newUserObj]);
    
    // Reset form and close modal
    setNewUser({
      name: '',
      email: '',
      status: 'active',
      plan: 'Basic'
    });
    setShowAddUserModal(false);
  };
  
  // Handle removing a user
  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };
  
  // Apply filters
  const applyFilters = () => {
    setShowFilterModal(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: '',
      plan: ''
    });
    setShowFilterModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <button 
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Add User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {(filters.status || filters.plan) && (
              <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(filters.status ? 1 : 0) + (filters.plan ? 1 : 0)}
              </span>
            )}
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Users Display - Table for Desktop, Cards for Mobile */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Conversations
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.plan}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.conversations}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Remove user"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View - Only visible on mobile */}
        <div className="md:hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No users found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-lg font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-base">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRemoveUser(user.id)}
                        className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Remove user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Plan</div>
                      <div>{user.plan}</div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Active</div>
                      <div>{user.lastActive}</div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversations</div>
                      <div>{user.conversations}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 rounded-md bg-primary text-white font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-6">Add New User</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="Full Name"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="email@example.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plan
                </label>
                <select
                  value={newUser.plan}
                  onChange={(e) => setNewUser({...newUser, plan: e.target.value})}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email}
                className={`px-4 py-2 rounded-lg text-white ${!newUser.name || !newUser.email ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowFilterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-6">Filter Users</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plan
                </label>
                <select
                  value={filters.plan}
                  onChange={(e) => setFilters({...filters, plan: e.target.value})}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                >
                  <option value="">All</option>
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
