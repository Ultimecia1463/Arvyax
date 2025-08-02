import { Link } from 'react-router-dom';

const SessionCard = ({ session, onDelete }) => {

  session.tags=["calm","nature","nature","nature","nature"]
  session.diffculty="Intermediate"

  return (
    <div className="bg-transparent backdrop-blur-[0.8px] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] shadow-gray-400 overflow-hidden hover:shadow-[0_0_35px_rgba(0,0,0,0.5)] hover:scale-102 hover:backdrop-blur-[1.8px] transition-all  duration-300">
      <div className="p-4 flex flex-col w-full h-full">
        <h3 className="text-2xl font-bold text-base-content">
          {session.title}
          {onDelete && (
            <div className={`btn btn-xs btn-active h-5 ml-2 outline-1 text-[10px] mb-1 ${
              session.status === "draft" ? "btn-accent" : "btn-success"
            }`}>
              {session.status}
            </div>
          )}
        </h3>
        <p className="text-sm text-base-content/80 mb-4">{session.description}</p>
        <div className='mt-auto' >
          <div className='flex flex-row flex-wrap gap-1 mb-3' >
            {
              session.tags.map((tag)=>{
                return <div key={Math.random()} className='btn btn-xs btn-secondary btn-active h-5 text-xs' >{tag}</div>
              })
            }
            {
              session.diffculty === "Advanced" ? (
                <div className="btn btn-xs btn-error btn-active h-5 text-xs">
                  {session.diffculty}
                </div>
              ) : session.diffculty === "Intermediate" ? (
                <div className="btn btn-xs btn-warning btn-active h-5 text-xs">
                  {session.diffculty}
                </div>
              ) : (
                <div className="btn btn-xs btn-success btn-active h-5 text-xs">
                  {session.diffculty}
                </div>
              )
            }
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-base-content/70">By: {session.user_id?.email || 'Anonymous'}</p>
            <div className="flex flex-row gap-1">
              {session.video_url && (
                <button
                  onClick={() => window.open(session.video_url, '_blank', 'noopener,noreferrer')}
                  className="btn btn-xs btn-ghost btn-success text-sm"
                >
                  Watch
                </button>
              )}
              {onDelete && (
                <>
                  <Link
                    to={`/editor/${session._id}`}
                    className="btn btn-xs btn-ghost btn-warning text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(session._id)}
                    className="btn btn-xs btn-ghost btn-error text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
