'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Sample data for charts
const conversationData = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 49 },
  { name: 'Thu', value: 63 },
  { name: 'Fri', value: 59 },
  { name: 'Sat', value: 38 },
  { name: 'Sun', value: 41 },
];

const responseTimeData = [
  { name: 'Mon', value: 4.5 },
  { name: 'Tue', value: 3.8 },
  { name: 'Wed', value: 5.2 },
  { name: 'Thu', value: 3.2 },
  { name: 'Fri', value: 3.5 },
  { name: 'Sat', value: 2.9 },
  { name: 'Sun', value: 3.1 },
];

const userSourceData = [
  { name: 'Website', value: 45 },
  { name: 'Mobile App', value: 28 },
  { name: 'API', value: 17 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

interface ChartProps {
  title: string;
  description?: string;
}

export function ConversationChart({ title, description }: ChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>}
      
      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={conversationData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ResponseTimeChart({ title, description }: ChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>}
      
      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={responseTimeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function UserSourceChart({ title, description }: ChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>}
      
      <div className="h-80 mt-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userSourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {userSourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ChartTabs() {
  const [activeTab, setActiveTab] = useState('conversations');
  
  return (
    <div className="space-y-4">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'conversations'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'responseTimes'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('responseTimes')}
        >
          Response Times
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'userSources'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('userSources')}
        >
          User Sources
        </button>
      </div>
      
      <div className="transition-all duration-300">
        {activeTab === 'conversations' && (
          <ConversationChart 
            title="Conversations Over Time" 
            description="Number of new conversations started each day"
          />
        )}
        {activeTab === 'responseTimes' && (
          <ResponseTimeChart 
            title="Response Times" 
            description="Average response time in minutes per day"
          />
        )}
        {activeTab === 'userSources' && (
          <UserSourceChart 
            title="User Sources" 
            description="Where your users are coming from"
          />
        )}
      </div>
    </div>
  );
}
