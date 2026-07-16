import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  updateApplicationStage,
  deleteApplication,
} from './applications.api';

const QUERY_KEYS = {
  APPLICATIONS: 'applications',
  APPLICATION: 'application',
};

export const useGetApplications = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATIONS, params],
    queryFn: () => getApplications(params),
    keepPreviousData: true,
  });
};

export const useGetApplication = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION, id],
    queryFn: () => getApplication(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
      toast.success('Application created successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create application';
      toast.error(message);
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateApplication(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATION, variables.id] });
      toast.success('Application updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update application';
      toast.error(message);
    },
  });
};

export const useUpdateApplicationStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }) => updateApplicationStage(id, stage),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATION, variables.id] });
      toast.success('Application stage updated');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update stage';
      toast.error(message);
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
      toast.success('Application deleted successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete application';
      toast.error(message);
    },
  });
};
