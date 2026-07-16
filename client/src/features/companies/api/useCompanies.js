import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from './companies.api';

const QUERY_KEYS = {
  COMPANIES: 'companies',
  COMPANY: 'company',
};

export const useGetCompanies = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANIES, params],
    queryFn: () => getCompanies(params),
    keepPreviousData: true,
  });
};

export const useGetCompany = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY, id],
    queryFn: () => getCompany(id),
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
      toast.success('Company created successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create company';
      toast.error(message);
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCompany(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY, variables.id] });
      toast.success('Company updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update company';
      toast.error(message);
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
      toast.success('Company deleted successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete company';
      toast.error(message);
    },
  });
};
