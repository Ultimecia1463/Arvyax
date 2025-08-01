const VideoModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white text-2xl font-bold"
        >
          ×
        </button>
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="Session Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
