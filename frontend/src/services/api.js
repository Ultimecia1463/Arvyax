const API_BASE = 'http://localhost:5000';

const handleApiResponse = async (response) => {
  if (!response.ok) {
    let msg = 'Request failed';
    try {
      const data = await response.json();
      msg = data.error || data.message || `HTTP ${response.status}`;
    } catch (e) {
      console.log(e);
      
      msg = `HTTP ${response.status} - ${response.statusText}`;
    }
    throw new Error(msg);
  }
  return response.json();
};

const getToken = () => JSON.parse(sessionStorage.getItem('user'))?.token;

export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleApiResponse(res);
  },

  login: async (userData) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleApiResponse(res);
  },
  
};

export const sessionAPI = {
  getPublicSessions: async () => {
    const res = await fetch(`${API_BASE}/api/sessions/public`);
    return handleApiResponse(res).then(data => ({ data: { sessions: data.sessions || [] } }));
  },

  getMySessions: async () => {
    const res = await fetch(`${API_BASE}/api/sessions/my`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleApiResponse(res).then(data => ({ data: { sessions: data.sessions || [] } }));
  },

  getMySession: async (id) => {
    const res = await fetch(`${API_BASE}/api/sessions/my/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleApiResponse(res).then(data => ({ data: { session: data.session } }));
  },

  saveDraft: async (data) => {
    const res = await fetch(`${API_BASE}/api/sessions/draft`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, status: 'draft' }),
    });
    return handleApiResponse(res).then(data => ({ data: { session: data.session } }));
  },

  publishSession: async (data) => {
    const res = await fetch(`${API_BASE}/api/sessions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse(res);
  },

  deleteSession: async (id) => {
    const res = await fetch(`${API_BASE}/api/sessions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    await handleApiResponse(res);
    return { data: { success: true } };
  },
};

export { API_BASE };