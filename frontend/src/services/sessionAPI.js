import api from './api.js';

export const sessionAPI = {
  getPublicSessions: () => api.get('/api/sessions/public'),

  getMySessions: () => api.get('/api/sessions/my'),

  getMySession: (id) => api.get(`/api/sessions/my/${id}`).then((res) => res.session),

  saveDraft: (data) =>
    api.post('/api/sessions/draft', { ...data, status: 'draft' }).then((res) => res.session),

  publishSession: (data) => api.post('/api/sessions/publish', data),

  deleteSession: (id) => api.delete(`/api/sessions/${id}`),
};
