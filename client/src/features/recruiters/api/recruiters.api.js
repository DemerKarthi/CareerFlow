import api from '../../../api/axios';

export const getRecruiters = async (params) => {
  const response = await api.get('/recruiters', { params });
  return response.data;
};

export const getRecruiter = async (id) => {
  const response = await api.get(`/recruiters/${id}`);
  return response.data.data;
};

export const createRecruiter = async (data) => {
  const response = await api.post('/recruiters', data);
  return response.data.data;
};

export const updateRecruiter = async (id, data) => {
  const response = await api.put(`/recruiters/${id}`, data);
  return response.data.data;
};

export const deleteRecruiter = async (id) => {
  const response = await api.delete(`/recruiters/${id}`);
  return response.data;
};
