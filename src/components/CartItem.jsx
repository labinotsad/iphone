import ClipPath from "../assets/svg/ClipPath";

const CartItem = ({ item, onRemove, onIncrease, onDecrease, onBuy }) => {
  return (
    <div
      className='grid grid-cols-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[1200px]'
      style={{ backgroundImage: `url(${item.backgroundUrl})` }}
    >
      <div>
        <img className='rounded-3xl' src={item.image} alt='' width={320} />
      </div>
      <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]'>
        <div className='flex-grow'>
          <h5 className='h5 mb-2'>{item.title}</h5>
          <p className='body-2 mb-4 text-n-3'>{item.overview}</p>
        </div>
        <div className='mt-auto'>
          <p className='font-bold text-lg'>€{item.price * item.quantity}</p>
          <div className='flex items-center mt-1'>
            <div className='flex items-center'>
              <button className='mr-2 p-2' onClick={() => onDecrease(item.id)}>
                -
              </button>
              <span className='px-4'>{item.quantity}</span>
              <button className='ml-2 p-2' onClick={() => onIncrease(item.id)}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-between md:mt-8'>
          <button
            onClick={() => onRemove(item)}
            className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider'
          >
            Remove it
          </button>
          <button
            onClick={() => onBuy(item)}
            className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider'
          >
            Buy it
          </button>
        </div>
      </div>
      <ClipPath />
    </div>
  );
};

export default CartItem;
