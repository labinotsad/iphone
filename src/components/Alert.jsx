const Alert = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div className='bg-black bg-opacity-50 absolute inset-0'></div>
      <div className='bg-white text-center p-6 rounded-lg shadow-lg relative z-10'>
        <p className='text-lg text-green-600'>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
