import api from '../../../api/axios';

export const getApplications = async (params) => {
  const response = await api.get('/applications', { params });
  return response.data;
};

export const getApplication = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response.data.data;
};

export const createApplication = async (data) => {
  const response = await api.post('/applications', data);
  return response.data.data;
};

export const updateApplication = async (id, data) => {
  const response = await api.put(`/applications/${id}`, data);
  return response.data.data;
};

export const updateApplicationStage = async (id, currentStage) => {
  const response = await api.patch(`/applications/${id}/stage`, { currentStage });
  return response.data.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};
