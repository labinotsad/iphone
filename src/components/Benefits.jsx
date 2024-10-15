import { useContext } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { CartContext } from "../context/CartContext";

const Benefits = () => {
  const { addToCart } = useContext(CartContext);
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
      y: -30,
      ease: "power1",
      scale: 1,
    });
  }, []);
  return (
    <section id='features'>
      <div className='container relative z-2'>
        <h3 id='hero' className='h3 mt-10 text-center mb-10 opacity-0'>
          Explore the full models.
        </h3>
        <div className='flex flex-wrap gap-10 mb-10'>
          {benefits.map((item) => (
            <div
              className='block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]'
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                <h5 className='h5 mb-5'>{item.title}</h5>
                <p className='body-2 mb-6 text-n-3'>{item.text}</p>
                <div className='flex items-center mt-auto'>
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <button
                    className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    onClick={() => addToCart(item)}
                  >
                    Buy it
                  </button>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className='absolute inset-0.5 bg-n-8'
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className='absolute inset-0 opacity-0 transition-opacity hover:opacity-60'>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className='w-full  object-cover'
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
