import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  updateInterviewStatus,
  deleteInterview,
} from './interviews.api';

const QUERY_KEYS = {
  INTERVIEWS: 'interviews',
  INTERVIEW: 'interview',
};

export const useGetInterviews = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERVIEWS, params],
    queryFn: () => getInterviews(params),
    keepPreviousData: true,
  });
};

export const useGetInterview = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERVIEW, id],
    queryFn: () => getInterview(id),
    enabled: !!id,
  });
};

export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] });
      toast.success('Interview scheduled successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to schedule interview';
      toast.error(message);
    },
  });
};

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateInterview(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEW, variables.id] });
      toast.success('Interview updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update interview';
      toast.error(message);
    },
  });
};

export const useUpdateInterviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateInterviewStatus(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEW, variables.id] });
      toast.success('Interview status updated');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INTERVIEWS] });
      toast.success('Interview deleted successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete interview';
      toast.error(message);
    },
  });
};
