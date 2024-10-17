import React from "react";

const OrderItem = ({ item, onRemove, onBuyAgain }) => {
  return (
    <div
      className='grid grid-cols-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%]'
      style={{ backgroundImage: `url(${item.backgroundUrl})` }}
      key={item.id}
    >
      <div>
        <img
          className='rounded-3xl'
          src={item.image}
          alt={item.title}
          width={320}
        />
      </div>
      <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
        <h5 className='h5 mb-2'>{item.title}</h5>
        <p className='body-2 mb-4 text-n-3'>{item.overview}</p>
        <p className='font-bold text-lg'>€{item.price * item.quantity}</p>
        <p className='text-md'>Quantity: {item.quantity}</p>
        <div className='flex justify-between mt-8'>
          <button
            className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
            onClick={() => onRemove(item)}
          >
            Remove it
          </button>
          <button
            className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
            onClick={() => onBuyAgain(item)}
          >
            Buy it Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
