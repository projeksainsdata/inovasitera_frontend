import hero from '../assets/HeroPage.png';

const Hero = () => {
  return (
    <div className="relative flex items-center w-full md:h-auto h-[300px] z-0"> 
      <img
        src={hero}
        alt="Desktop hero"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Hero;
