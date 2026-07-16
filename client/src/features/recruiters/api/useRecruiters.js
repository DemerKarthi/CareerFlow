import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from './recruiters.api';

const QUERY_KEYS = {
  RECRUITERS: 'recruiters',
  RECRUITER: 'recruiter',
};

export const useGetRecruiters = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECRUITERS, params],
    queryFn: () => getRecruiters(params),
    keepPreviousData: true,
  });
};

export const useGetRecruiter = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECRUITER, id],
    queryFn: () => getRecruiter(id),
    enabled: !!id,
  });
};

export const useCreateRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecruiter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITERS] });
      toast.success('Recruiter added successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to add recruiter';
      toast.error(message);
    },
  });
};

export const useUpdateRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateRecruiter(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITER, variables.id] });
      toast.success('Recruiter updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update recruiter';
      toast.error(message);
    },
  });
};

export const useDeleteRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruiter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITERS] });
      toast.success('Recruiter deleted successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete recruiter';
      toast.error(message);
    },
  });
};
