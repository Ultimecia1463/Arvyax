import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast fixed transition-all duration-300">
      <div className={`alert ${
        type === 'success'
          ? 'alert-success'
          : type === 'error'
          ? 'alert-error'
          : 'alert-info'
      }`}>
        <span className='font-heading' >{message}</span>
        <button onClick={onClose} className="font-extralight text-4xl">×</button>
      </div>
    </div>
  );
};

export default Toast;
