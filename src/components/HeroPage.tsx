import hero from '../assets/HeroPage.png';

const Hero = () => {
  return (
    <div className="relative flex items-center w-full h-auto z-0"> {/* h-auto adjusts height based on content */}
      {/* Image for desktop view */}
      <img
        src={hero}
        alt="Desktop hero"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Hero;
