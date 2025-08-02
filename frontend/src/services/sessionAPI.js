import api from './api.js'

export const sessionAPI = {
  // Public sessions
  getPublicSessions: () =>
    api.get('/sessions/public').then(res => res.data.sessions),

  // All sessions for logged-in user
  getMySessions: () =>
    api.get('/sessions/my').then(res => res.data.sessions),

  // Single session for logged-in user
  getMySession: (id) =>
    api.get(`/sessions/my/${id}`).then(res => res.data.session),

  // Save or update draft
  saveDraft: (data) =>
    api.post('/sessions/draft', { ...data, status: 'draft' })
      .then(res => res.data.session),

  // Publish session
  publishSession: (data) =>
    api.post('/sessions/publish', data)
      .then(res => res.data.session),

  // Delete session
  deleteSession: (id) =>
    api.delete(`/sessions/${id}`).then(res => res.data)
}
