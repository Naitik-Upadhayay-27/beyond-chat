'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Users, MessageSquare, Clock } from 'lucide-react';
import { useDashboardStats, useRecentActivities, useConversations } from '@/lib/hooks';
import { ActivityItem, Conversation } from '@/lib/api';
import { ChartTabs } from '@/components/ui/DashboardCharts';
import PageTransition, { StaggeredChildren, StaggeredItem } from '@/components/ui/PageTransition';

export default function DashboardPage() {
  // Fetch dashboard data using our custom hooks
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useRecentActivities();
  const { data: conversations, isLoading: conversationsLoading } = useConversations();
  
  // Format percentage changes for display
  const formatChange = (value: number) => {
    return value >= 0 ? `+${value}%` : `${value}%`;
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsLoading ? (
            // Show skeleton loaders while loading
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            ))
          ) : (
            // Show actual data when loaded
            <>
              <StatsCard 
                title="Active Users" 
                value={stats.activeUsers.count.toLocaleString()} 
                change={formatChange(stats.activeUsers.change)} 
                icon={<Users className="h-6 w-6" />} 
                positive={stats.activeUsers.change >= 0} 
              />
              <StatsCard 
                title="Conversations" 
                value={stats.conversations.count.toLocaleString()} 
                change={formatChange(stats.conversations.change)} 
                icon={<MessageSquare className="h-6 w-6" />} 
                positive={stats.conversations.change >= 0} 
              />
              <StatsCard 
                title="Response Time" 
                value={stats.responseTime.value} 
                change={formatChange(stats.responseTime.change)} 
                icon={<Clock className="h-6 w-6" />} 
                positive={stats.responseTime.change <= 0} 
              />
              <StatsCard 
                title="Activity" 
                value={stats.activity.value} 
                change={formatChange(stats.activity.change)} 
                icon={<Activity className="h-6 w-6" />} 
                positive={stats.activity.change >= 0} 
              />
            </>
          )}
        </div>
        
        {/* Charts */}
        <div className="mb-6">
          <ChartTabs />
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentConversations conversations={conversations} isLoading={conversationsLoading} />
          <ActivityFeed activities={activities} isLoading={activitiesLoading} />
        </div>
      </div>
    </PageTransition>
  );
}

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  positive 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
  positive: boolean; 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
        <p className={`text-sm mt-2 ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {change} from last month
        </p>
      </div>
    </div>
  );
}

// Recent Conversations Component
function RecentConversations({ conversations, isLoading }: { conversations: Conversation[], isLoading: boolean }) {
  // Take only the first 4 conversations for display
  const recentConversations = conversations?.slice(0, 4) || [];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Recent Conversations</h3>
      <div className="space-y-4">
        {isLoading ? (
          // Show skeleton loaders while loading
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-start p-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="text-right">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          ))
        ) : (
          recentConversations.map((convo) => (
            <div key={convo.id} className="flex items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {convo.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{convo.user}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">{convo.time}</p>
                <span className={`inline-block px-2 py-1 mt-1 text-xs rounded-full ${
                  convo.status === 'active' ? 'bg-green-100 text-green-800' : 
                  convo.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {convo.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="mt-4 text-primary font-medium text-sm">View all conversations →</button>
    </div>
  );
}

// Activity Feed Component
function ActivityFeed({ activities, isLoading }: { activities: ActivityItem[], isLoading: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Activity Feed</h3>
      <div className="space-y-4">
        {isLoading ? (
          // Show skeleton loaders while loading
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-start animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {activity.user.charAt(0)}
              </div>
              <div>
                <p>
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-gray-500 dark:text-gray-400"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="mt-4 text-primary font-medium text-sm">View all activity →</button>
    </div>
  );
}
