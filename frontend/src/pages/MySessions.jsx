import { useEffect, useState } from 'react';
import { sessionAPI } from '../services/sessionAPI';
import Navbar from '../components/Navbar';
import SessionCard from '../components/SessionCard';
import Toast from '../components/Toast';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchMySessions = async () => {
    try {
      const sessions = await sessionAPI.getMySessions();
      setSessions(sessions);
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
    <div className='min-h-screen bg-base-200 bg-[radial-gradient(#b5b8bd_1px,transparent_1px)] [background-size:16px_16px]'>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="mt-6 text-3xl font-extrabold font-heading text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-accent from-primary">My Sessions</span>
        </h1>
        <div className="mt-25 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sessions.length === 0 ? (
            <>
              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>

              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>

              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>

              <h2 className='mt-4 text-4xl text-neutral-content font-bold whitespace-nowrap text-shadow-xs' >You haven’t made any sessions yet..</h2>
            </>
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
