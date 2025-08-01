import { useEffect, useState } from 'react';
import { sessionAPI } from '../services/api';
import Navigation from '../components/Navigation';
import SessionCard from '../components/SessionCard';
import Toast from '../components/Toast';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchMySessions = async () => {
    try {
      const { data } = await sessionAPI.getMySessions();
      setSessions(data.sessions);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await sessionAPI.deleteSession(id);
      setToast({ message: 'Session deleted', type: 'success' });
      fetchMySessions();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  useEffect(() => {
    fetchMySessions();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">My Sessions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">You haven't created any sessions yet.</p>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session._id} session={session} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default MySessions;
