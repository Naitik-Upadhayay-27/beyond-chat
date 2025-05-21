'use client';

import React, { useState } from 'react';
import { Bell, Moon, Globe, Lock, Users, MessageSquare, Zap, Mail } from 'lucide-react';

export default function SettingsPage() {
  // State for active settings section
  const [activeSection, setActiveSection] = useState('notifications');
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <nav className="space-y-1">
              <SettingsNavItem 
                icon={<Bell />} 
                label="Notifications" 
                active={activeSection === 'notifications'} 
                onClick={() => setActiveSection('notifications')}
              />
              <SettingsNavItem 
                icon={<Moon />} 
                label="Appearance" 
                active={activeSection === 'appearance'} 
                onClick={() => setActiveSection('appearance')}
              />
              <SettingsNavItem 
                icon={<Globe />} 
                label="Language & Region" 
                active={activeSection === 'language'} 
                onClick={() => setActiveSection('language')}
              />
              <SettingsNavItem 
                icon={<Lock />} 
                label="Security" 
                active={activeSection === 'security'} 
                onClick={() => setActiveSection('security')}
              />
              <SettingsNavItem 
                icon={<Users />} 
                label="Team Members" 
                active={activeSection === 'team'} 
                onClick={() => setActiveSection('team')}
              />
              <SettingsNavItem 
                icon={<MessageSquare />} 
                label="Chat Settings" 
                active={activeSection === 'chat'} 
                onClick={() => setActiveSection('chat')}
              />
              <SettingsNavItem 
                icon={<Zap />} 
                label="Integrations" 
                active={activeSection === 'integrations'} 
                onClick={() => setActiveSection('integrations')}
              />
              <SettingsNavItem 
                icon={<Mail />} 
                label="Email Templates" 
                active={activeSection === 'email'} 
                onClick={() => setActiveSection('email')}
              />
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {/* Dynamic title based on active section */}
            <h2 className="text-xl font-bold mb-6">
              {activeSection === 'notifications' && 'Notification Settings'}
              {activeSection === 'appearance' && 'Appearance Settings'}
              {activeSection === 'language' && 'Language & Region Settings'}
              {activeSection === 'security' && 'Security Settings'}
              {activeSection === 'team' && 'Team Members Settings'}
              {activeSection === 'chat' && 'Chat Settings'}
              {activeSection === 'integrations' && 'Integrations'}
              {activeSection === 'email' && 'Email Templates'}
            </h2>
            
            <div className="space-y-6">
              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <>
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="New conversation" 
                        description="Receive an email when a new conversation is started"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Conversation assigned" 
                        description="Receive an email when a conversation is assigned to you"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Conversation resolved" 
                        description="Receive an email when a conversation is marked as resolved"
                        defaultChecked={false}
                      />
                      <ToggleSetting 
                        label="Daily summary" 
                        description="Receive a daily summary of all conversations"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  {/* In-app Notifications */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">In-app Notifications</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="New message" 
                        description="Show a notification when a new message is received"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Conversation assigned" 
                        description="Show a notification when a conversation is assigned to you"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Mention notifications" 
                        description="Show a notification when you are mentioned in a conversation"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="System notifications" 
                        description="Show notifications for system events and updates"
                        defaultChecked={false}
                      />
                    </div>
                  </div>
                  
                  {/* Desktop Notifications */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Desktop Notifications</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Enable desktop notifications" 
                        description="Allow browser notifications on your desktop"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Sound alerts" 
                        description="Play a sound when a new notification is received"
                        defaultChecked={false}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Appearance Section */}
              {activeSection === 'appearance' && (
                <>
                  {/* Theme Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Dark mode" 
                        description="Enable dark mode for the interface"
                        defaultChecked={false}
                      />
                      <ToggleSetting 
                        label="Follow system theme" 
                        description="Automatically match your system's theme settings"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  {/* Layout Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Layout</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Compact view" 
                        description="Use a more compact layout to fit more content on screen"
                        defaultChecked={false}
                      />
                      <ToggleSetting 
                        label="Show avatars" 
                        description="Display user avatars in conversations and lists"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  {/* Accessibility Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Accessibility</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Larger text" 
                        description="Increase the size of text throughout the interface"
                        defaultChecked={false}
                      />
                      <ToggleSetting 
                        label="Reduce animations" 
                        description="Minimize motion and animations in the interface"
                        defaultChecked={false}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Language & Region Section */}
              {activeSection === 'language' && (
                <>
                  {/* Language Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Language</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interface Language</label>
                        <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary">
                          <option>English (US)</option>
                          <option>English (UK)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                          <option>Chinese (Simplified)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Region Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Region</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Zone</label>
                        <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary">
                          <option>(GMT-08:00) Pacific Time</option>
                          <option>(GMT-07:00) Mountain Time</option>
                          <option>(GMT-06:00) Central Time</option>
                          <option>(GMT-05:00) Eastern Time</option>
                          <option>(GMT+00:00) UTC</option>
                          <option>(GMT+01:00) Central European Time</option>
                          <option>(GMT+08:00) China Standard Time</option>
                          <option>(GMT+09:00) Japan Standard Time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
                        <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Security Section */}
              {activeSection === 'security' && (
                <>
                  {/* Password Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input type="password" placeholder="••••••••" className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input type="password" placeholder="••••••••" className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary" />
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Update Password</button>
                    </div>
                  </div>
                  
                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Enable 2FA" 
                        description="Add an extra layer of security to your account"
                        defaultChecked={false}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Team Members Section */}
              {activeSection === 'team' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm">Invite Member</button>
                  </div>
                  
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">JD</div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">John Doe</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">Admin</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">Active</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary/80">Edit</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">JS</div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">Jane Smith</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">jane.smith@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">Support Agent</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">Active</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary/80">Edit</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              {/* Chat Settings Section */}
              {activeSection === 'chat' && (
                <>
                  {/* General Chat Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">General</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Auto-assign conversations" 
                        description="Automatically assign new conversations to available agents"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Show typing indicator" 
                        description="Show when users are typing in the chat"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Save chat history" 
                        description="Save chat history for future reference"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                  
                  {/* AI Assistant Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">AI Assistant</h3>
                    <div className="space-y-4">
                      <ToggleSetting 
                        label="Enable AI Assistant" 
                        description="Use AI to help answer common questions"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="Auto-suggest responses" 
                        description="Automatically suggest responses based on conversation context"
                        defaultChecked={true}
                      />
                      <ToggleSetting 
                        label="AI-powered routing" 
                        description="Use AI to route conversations to the most appropriate agent"
                        defaultChecked={false}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Integrations Section */}
              {activeSection === 'integrations' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Slack</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Connect your Slack workspace to receive notifications</p>
                        </div>
                        <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg">Connect</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Google Calendar</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sync your calendar for scheduling meetings</p>
                        </div>
                        <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg">Connect</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Zapier</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Connect with thousands of apps through Zapier</p>
                        </div>
                        <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg">Connect</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">HubSpot</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sync customer data with your HubSpot CRM</p>
                        </div>
                        <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg">Connect</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Email Templates Section */}
              {activeSection === 'email' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Email Templates</h3>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm">Create Template</button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Welcome Email</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sent to new users when they sign up</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Edit</button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Preview</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Password Reset</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sent when a user requests a password reset</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Edit</button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Preview</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Support Ticket Confirmation</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sent when a user creates a new support ticket</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Edit</button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">Preview</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Save Button */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Navigation Item Component
function SettingsNavItem({ 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${active ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
      <span className={`${active ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

// Toggle Setting Component
function ToggleSetting({ 
  label, 
  description, 
  defaultChecked 
}: { 
  label: string; 
  description: string; 
  defaultChecked: boolean; 
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
    </div>
  );
}
