import newHeroImage1 from "../assets/newHeroImage1.jpg";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

const Slider = () => {
  useGSAP(() => {
    animateWithGsap("#hero", {
      y: 2,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <div className='relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24 lg:mt-4 '>
      <h3 id='hero' className='h3 mt-10 text-center mb-10 opacity-0'>
        Explore the full models.
      </h3>
      <div className='relative z-1 p-0.5 rounded-2xl bg-conic-gradient'>
        <div className='relative bg-n-8 rounded-[1rem]'>
          <div className=' rounded-t-[0.9rem]' />

          <div className='aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] '>
            <img
              src={newHeroImage1}
              className='w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[15%]'
              width={1024}
              height={490}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
