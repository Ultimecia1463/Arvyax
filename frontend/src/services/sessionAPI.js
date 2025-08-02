import api from './api.js';

export const sessionAPI = {
  getPublicSessions: () =>
    api.get('/api/sessions/public').then((sessions) => ({
      data: { sessions: sessions.sessions || [] }
    })),

  getMySessions: () =>
    api.get('/api/sessions/my').then((sessions) => ({
      data: { sessions: sessions.sessions || [] }
    })),

  getMySession: (id) =>
    api.get(`/api/sessions/my/${id}`).then((session) => ({
      data: { session: session.session }
    })),

  saveDraft: (data) =>
    api.post('/api/sessions/draft', { ...data, status: 'draft' }).then((session) => ({
      data: { session: session.session }
    })),

  publishSession: (data) => api.post('/api/sessions/publish', data),

  deleteSession: (id) =>
    api.delete(`/api/sessions/${id}`).then(() => ({
      data: { success: true }
    })),
};
