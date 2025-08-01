import { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';

const SessionCard = ({ session, onDelete }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{session.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">By: {session.user_id?.email || 'Anonymous'}</p>
          <div className="flex gap-2">
            {session.video_url && (
              <button
                onClick={() => setShowVideo(true)}
                className="text-blue-500 hover:underline text-sm"
              >
                Watch
              </button>
            )}
            {onDelete && (
              <>
                <Link
                  to={`/editor/${session._id}`}
                  className="text-purple-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(session._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showVideo && (
        <VideoModal videoUrl={session.video_url} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
};

export default SessionCard;
