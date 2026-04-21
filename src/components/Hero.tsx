import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

const heroImages = [
  "https://i.pinimg.com/736x/62/bb/c8/62bbc8b38e0f45edd4142e75e2489002.jpg",
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1600"
];

export default function Hero() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-primary pt-32 pb-0 overflow-hidden text-center text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="uppercase tracking-widest text-[10px] font-black mb-4 opacity-100 flex items-center justify-center space-x-2">
            <div className="h-[0.5px] w-8 bg-white/40"></div>
            <span>ECO CLEAN SERVICE</span>
            <div className="h-[0.5px] w-8 bg-white/40"></div>
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-light tracking-tight leading-tight mb-6">
            러블리한 <span className="font-bold">하우스의 첫걸음</span>
          </h1>
          
          <p className="text-xl sm:text-2xl opacity-90 mb-10 font-medium">
            편안하고 안락한 공간을 위해 최선을 다합니다.
          </p>

          <div className="mb-16">
            <button
              onClick={() => navigate('/booking')}
              className="inline-flex justify-center items-center px-10 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-accent-dark transition-all shadow-xl hover:scale-105 active:scale-95 group"
            >
              정기구독 서비스 신청하기
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hero Image Slider */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative overflow-hidden h-[350px] md:h-[600px] rounded-t-[3rem] shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            src={heroImages[currentImage]}
            alt="Professional Cleaning Service"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 transition-all duration-300 rounded-full ${i === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
