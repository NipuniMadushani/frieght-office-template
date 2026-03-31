import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosServices from 'utils/axios';

/**
 * Enterprise React Query Layer for User Profile
 * Independent of Redux Store!
 */

// Use specific microservice host from environment
const USER_SERVICE_URL = import.meta.env.VITE_APP_USER_SERVICE_URL || 'http://localhost:8099';

// Custom Hook to GET Profile
export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ['UserProfile'],
    queryFn: async () => {
      // By using a full absolute URL, Axios safely ignores its default mock baseURL
      const response = await axiosServices.get(`${USER_SERVICE_URL}/api/v1/user/profile`);
      return response.data;
    },
    // BEST PRACTICE: Smart Retry Logic
    retry: (failureCount, error) => {
      // Don't retry more than 3 times
      if (failureCount >= 3) return false;
      // Immediately fail and do not retry if error is a 4xx Client Error (401, 403, 404, etc.)
      // if (error?.response?.status >= 400 && error?.response?.status < 500) return false;
      // For all other errors (like 500 Server Error or generic network drops), KEEP retrying!
      return true;
    },
    refetchOnWindowFocus: false // Prevent spamming API when clicking back and forth between browser tabs
  });
};

// Custom Hook to GET All User Profiles
export const useGetAllProfilesQuery = () => {
  return useQuery({
    queryKey: ['AllUserProfiles'],
    queryFn: async () => {
      const response = await axiosServices.get(`${USER_SERVICE_URL}/api/v1/user/profile/all`);
      return response.data;
    },
    // BEST PRACTICE: Smart Retry Logic
    retry: (failureCount, error) => {
      if (failureCount >= 3) return false;
      if (error?.response?.status >= 400 && error?.response?.status < 500) return false;
      return true;
    },
    refetchOnWindowFocus: false
  });
};

// Custom Hook to UPDATE Profile (PUT)
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosServices.put(`${USER_SERVICE_URL}/api/v1/user/profile`, userData);
      return response.data;
    },
    meta: {
      successMessage: 'Awesome! Your User Profile was safely updated.'
    },
    onSuccess: () => {
      // Instantly refresh any component relying on 'UserProfile'
      queryClient.invalidateQueries({ queryKey: ['UserProfile'] });
    }
  });
};

// Custom Hook to SAVE new Profile (POST)
export const useSaveProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosServices.post(`${USER_SERVICE_URL}/api/v1/user/profile`, userData);
      console.warn(response.data);
      return response.data;
    },
    meta: {
      successMessage: 'Awesome! Your User Profile was saved securely.'
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['UserProfile'] });
    }
  });
};
