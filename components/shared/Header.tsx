"use client";

import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const notifications = [
    { id: 1, message: 'New conversation from Sarah Johnson', time: '5 minutes ago' },
    { id: 2, message: 'Michael Brown upgraded to Pro plan', time: '2 hours ago' },
    { id: 3, message: 'System update completed successfully', time: '5 hours ago' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      {/* Left Side - Empty on mobile, Search on desktop */}
      <div className="flex-1 md:flex-none">
        <div className="relative max-w-md w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <button className="text-primary text-sm font-medium">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <span className="hidden md:block text-sm font-medium">John Doe</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
              </div>
              <div className="py-1">
                <button className="px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                  Your Profile
                </button>
                <button className="px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                  Settings
                </button>
                <button className="px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-red-500">
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
