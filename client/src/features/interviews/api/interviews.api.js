import api from '../../../api/axios';

export const getInterviews = async (params) => {
  const response = await api.get('/interviews', { params });
  return response.data;
};

export const getInterview = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data.data;
};

export const createInterview = async (data) => {
  const response = await api.post('/interviews', data);
  return response.data.data;
};

export const updateInterview = async (id, data) => {
  const response = await api.put(`/interviews/${id}`, data);
  return response.data.data;
};

export const updateInterviewStatus = async (id, data) => {
  const response = await api.patch(`/interviews/${id}/status`, data);
  return response.data.data;
};

export const deleteInterview = async (id) => {
  const response = await api.delete(`/interviews/${id}`);
  return response.data;
};
