import { useEffect, useState } from 'react';
import { sessionAPI } from '../services/api';
import Navigation from '../components/Navigation';
import SessionCard from '../components/SessionCard';
import Toast from '../components/Toast';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await sessionAPI.getPublicSessions();
        setSessions(data.sessions);
      } catch (err) {
        setToast({ message: err.message, type: 'error' });
      }
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Published Sessions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No sessions available.</p>
          ) : (
            sessions.map((session) => <SessionCard key={session._id} session={session} />)
          )}
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Dashboard;
