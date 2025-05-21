import { useState, useEffect } from 'react';
import { api } from './api';
import type { 
  User, 
  Conversation, 
  Message, 
  DashboardStats, 
  ActivityItem 
} from './api';

// Generic hook for data fetching with loading and error states
function useApiData<T>(
  fetchFunction: () => Promise<T>,
  initialData: T,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, dependencies);
  
  return { data, isLoading, error };
}

// Specific hooks for different data types
export function useUsers() {
  return useApiData<User[]>(() => api.getUsers(), [], []);
}

export function useUser(id: number | null) {
  return useApiData<User | undefined>(
    () => id ? api.getUserById(id) : Promise.resolve(undefined),
    undefined,
    [id]
  );
}

export function useConversations() {
  return useApiData<Conversation[]>(() => api.getConversations(), [], []);
}

export function useConversation(id: number | null) {
  return useApiData<Conversation | undefined>(
    () => id ? api.getConversationById(id) : Promise.resolve(undefined),
    undefined,
    [id]
  );
}

export function useUserConversations(userId: number | null) {
  return useApiData<Conversation[]>(
    () => userId ? api.getConversationsByUserId(userId) : Promise.resolve([]),
    [],
    [userId]
  );
}

export function useDashboardStats() {
  return useApiData<DashboardStats>(() => api.getDashboardStats(), {
    activeUsers: { count: 0, change: 0 },
    conversations: { count: 0, change: 0 },
    responseTime: { value: '0m', change: 0 },
    activity: { value: '0%', change: 0 }
  }, []);
}

export function useRecentActivities() {
  return useApiData<ActivityItem[]>(() => api.getRecentActivities(), [], []);
}
