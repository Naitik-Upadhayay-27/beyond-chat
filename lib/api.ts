// Mock API service to simulate fetching data from a backend

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  plan: string;
  lastActive: string;
  conversations: number;
  location?: string;
  browser?: string;
  device?: string;
  os?: string;
  timezone?: string;
  firstSeen?: string;
  tags?: string[];
}

export interface Conversation {
  id: number;
  user: string;
  userId: number;
  avatar: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'waiting' | 'resolved';
  unread: boolean;
  messages?: Message[];
}

export interface Message {
  id: number;
  sender: 'customer' | 'agent';
  content: string;
  time: string;
  attachments?: string[];
}

export interface DashboardStats {
  activeUsers: {
    count: number;
    change: number;
  };
  conversations: {
    count: number;
    change: number;
  };
  responseTime: {
    value: string;
    change: number;
  };
  activity: {
    value: string;
    change: number;
  };
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
}

// Mock data
const users: User[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    status: 'active',
    plan: 'Premium',
    lastActive: '5 minutes ago',
    conversations: 12,
    location: 'San Francisco, CA',
    browser: 'Chrome 112.0.5615.138',
    device: 'MacBook Pro (2021)',
    os: 'macOS 12.4',
    timezone: 'Pacific Time (UTC-7)',
    firstSeen: '2023-01-15',
    tags: ['Premium Plan', 'Technical Issue', 'High Priority']
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    status: 'active',
    plan: 'Premium',
    lastActive: '15 minutes ago',
    conversations: 8,
    location: 'New York, NY',
    browser: 'Firefox 102.0',
    device: 'Windows PC',
    os: 'Windows 11',
    timezone: 'Eastern Time (UTC-5)',
    firstSeen: '2023-02-10',
    tags: ['Premium Plan', 'Billing Issue']
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'inactive',
    plan: 'Basic',
    lastActive: '3 days ago',
    conversations: 5,
    location: 'Chicago, IL',
    browser: 'Safari 15.4',
    device: 'iPhone 13',
    os: 'iOS 15.5',
    timezone: 'Central Time (UTC-6)',
    firstSeen: '2023-01-20',
    tags: ['Basic Plan']
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    status: 'active',
    plan: 'Basic',
    lastActive: '1 hour ago',
    conversations: 3,
    location: 'Austin, TX',
    browser: 'Edge 103.0.1264.37',
    device: 'Surface Pro',
    os: 'Windows 10',
    timezone: 'Central Time (UTC-6)',
    firstSeen: '2023-03-05',
    tags: ['Basic Plan', 'Feature Request']
  },
  {
    id: 5,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@example.com',
    status: 'inactive',
    plan: 'Premium',
    lastActive: '1 week ago',
    conversations: 15,
    location: 'Seattle, WA',
    browser: 'Chrome 112.0.5615.138',
    device: 'Android Phone',
    os: 'Android 12',
    timezone: 'Pacific Time (UTC-7)',
    firstSeen: '2022-11-15',
    tags: ['Premium Plan', 'Inactive User']
  },
  {
    id: 6,
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    status: 'active',
    plan: 'Enterprise',
    lastActive: '30 minutes ago',
    conversations: 22,
    location: 'Boston, MA',
    browser: 'Chrome 112.0.5615.138',
    device: 'Dell XPS',
    os: 'Windows 11',
    timezone: 'Eastern Time (UTC-5)',
    firstSeen: '2022-10-20',
    tags: ['Enterprise Plan', 'API User', 'High Priority']
  },
  {
    id: 7,
    name: 'Jessica Anderson',
    email: 'jessica.anderson@example.com',
    status: 'active',
    plan: 'Basic',
    lastActive: '2 hours ago',
    conversations: 1,
    location: 'Denver, CO',
    browser: 'Firefox 102.0',
    device: 'iPad Pro',
    os: 'iPadOS 15.5',
    timezone: 'Mountain Time (UTC-7)',
    firstSeen: '2023-04-10',
    tags: ['Basic Plan', 'New User']
  },
  {
    id: 8,
    name: 'Thomas Martinez',
    email: 'thomas.martinez@example.com',
    status: 'active',
    plan: 'Premium',
    lastActive: '45 minutes ago',
    conversations: 7,
    location: 'Miami, FL',
    browser: 'Chrome 112.0.5615.138',
    device: 'MacBook Air',
    os: 'macOS 12.4',
    timezone: 'Eastern Time (UTC-5)',
    firstSeen: '2023-02-18',
    tags: ['Premium Plan', 'Support Request']
  }
];

const conversations: Conversation[] = [
  {
    id: 1,
    user: 'Sarah Johnson',
    userId: 1,
    avatar: 'SJ',
    lastMessage: 'I need help with my account settings',
    time: '5m ago',
    status: 'active',
    unread: true,
    messages: [
      { id: 1, sender: 'customer', content: 'Hi there! I need help with my account settings.', time: '10:05 AM' },
      { id: 2, sender: 'agent', content: 'Hello Sarah! I\'d be happy to help you with your account settings. What specific settings are you trying to adjust?', time: '10:07 AM' },
      { id: 3, sender: 'customer', content: 'I\'m trying to change my notification preferences, but I can\'t find where to do that.', time: '10:08 AM' },
      { id: 4, sender: 'agent', content: 'No problem! To change your notification preferences, you\'ll need to go to "Settings" in the top-right corner of your dashboard, then select "Notifications" from the menu on the left.', time: '10:10 AM' },
      { id: 5, sender: 'customer', content: 'I don\'t see a Notifications option in the menu.', time: '10:12 AM' },
      { id: 6, sender: 'agent', content: 'I apologize for the confusion. Are you using our mobile app or the web version?', time: '10:13 AM' },
      { id: 7, sender: 'customer', content: 'I\'m using the web version on Chrome.', time: '10:14 AM' },
    ]
  },
  {
    id: 2,
    user: 'Michael Brown',
    userId: 2,
    avatar: 'MB',
    lastMessage: 'How do I upgrade my plan?',
    time: '15m ago',
    status: 'active',
    unread: true,
    messages: [
      { id: 1, sender: 'customer', content: 'Hello, I\'m interested in upgrading my plan. What are my options?', time: '10:30 AM' },
      { id: 2, sender: 'agent', content: 'Hi Michael! I\'d be happy to help you upgrade your plan. We offer several tiers: Basic, Premium, and Enterprise. Which features are you most interested in?', time: '10:32 AM' },
      { id: 3, sender: 'customer', content: 'I need more users and better analytics.', time: '10:35 AM' },
      { id: 4, sender: 'agent', content: 'In that case, I\'d recommend our Premium plan. It includes up to 10 team members and advanced analytics with custom reports.', time: '10:37 AM' },
    ]
  },
  {
    id: 3,
    user: 'Emily Davis',
    userId: 3,
    avatar: 'ED',
    lastMessage: 'The dashboard isn\'t loading correctly',
    time: '1h ago',
    status: 'resolved',
    unread: false,
    messages: [
      { id: 1, sender: 'customer', content: 'Hi, I\'m having an issue with the dashboard. It\'s not loading correctly.', time: '9:15 AM' },
      { id: 2, sender: 'agent', content: 'Hello Emily, I\'m sorry to hear that. Could you tell me what browser you\'re using and what specifically isn\'t loading?', time: '9:17 AM' },
      { id: 3, sender: 'customer', content: 'I\'m using Safari and the charts aren\'t displaying.', time: '9:20 AM' },
      { id: 4, sender: 'agent', content: 'Thank you for that information. Could you try clearing your browser cache and cookies, then reload the page?', time: '9:22 AM' },
      { id: 5, sender: 'customer', content: 'That worked! Thank you.', time: '9:30 AM' },
      { id: 6, sender: 'agent', content: 'Great! I\'m glad that resolved the issue. Is there anything else I can help you with today?', time: '9:32 AM' },
      { id: 7, sender: 'customer', content: 'No, that\'s all. Thanks again!', time: '9:33 AM' },
    ]
  },
  {
    id: 4,
    user: 'David Wilson',
    userId: 4,
    avatar: 'DW',
    lastMessage: 'Can you help me with integration?',
    time: '2h ago',
    status: 'waiting',
    unread: false,
    messages: [
      { id: 1, sender: 'customer', content: 'Hello, I need help with integrating your API into our system.', time: '8:45 AM' },
      { id: 2, sender: 'agent', content: 'Hi David, I\'d be happy to help with the API integration. What programming language are you using?', time: '8:50 AM' },
      { id: 3, sender: 'customer', content: 'We\'re using Node.js.', time: '9:00 AM' },
    ]
  },
  {
    id: 5,
    user: 'Jennifer Taylor',
    userId: 5,
    avatar: 'JT',
    lastMessage: 'Thanks for your help!',
    time: '3h ago',
    status: 'resolved',
    unread: false
  },
  {
    id: 6,
    user: 'Robert Miller',
    userId: 6,
    avatar: 'RM',
    lastMessage: 'I\'m having trouble with the API',
    time: '5h ago',
    status: 'active',
    unread: false
  },
  {
    id: 7,
    user: 'Jessica Anderson',
    userId: 7,
    avatar: 'JA',
    lastMessage: 'When will the new features be available?',
    time: '1d ago',
    status: 'waiting',
    unread: false
  }
];

const dashboardStats: DashboardStats = {
  activeUsers: {
    count: 2453,
    change: 12.5
  },
  conversations: {
    count: 1235,
    change: 5.2
  },
  responseTime: {
    value: '3.2m',
    change: -10.8
  },
  activity: {
    value: '85%',
    change: 2.3
  }
};

const activities: ActivityItem[] = [
  { id: 1, user: 'Sarah Johnson', action: 'started a new conversation', time: '5m ago' },
  { id: 2, user: 'Support Team', action: 'resolved Emily\'s issue', time: '1h ago' },
  { id: 3, user: 'Michael Brown', action: 'upgraded to Pro plan', time: '2h ago' },
  { id: 4, user: 'System', action: 'performed automatic backup', time: '3h ago' },
  { id: 5, user: 'David Wilson', action: 'submitted a feedback form', time: '5h ago' }
];

// API functions with simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Users
  getUsers: async (): Promise<User[]> => {
    await delay(800);
    return [...users];
  },
  
  getUserById: async (id: number): Promise<User | undefined> => {
    await delay(500);
    return users.find(user => user.id === id);
  },
  
  // Conversations
  getConversations: async (): Promise<Conversation[]> => {
    await delay(800);
    return [...conversations];
  },
  
  getConversationById: async (id: number): Promise<Conversation | undefined> => {
    await delay(500);
    return conversations.find(convo => convo.id === id);
  },
  
  getConversationsByUserId: async (userId: number): Promise<Conversation[]> => {
    await delay(600);
    return conversations.filter(convo => convo.userId === userId);
  },
  
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(1000);
    return { ...dashboardStats };
  },
  
  getRecentActivities: async (): Promise<ActivityItem[]> => {
    await delay(700);
    return [...activities];
  }
};
