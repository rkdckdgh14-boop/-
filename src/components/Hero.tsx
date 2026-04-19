import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

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
            매주 찾아가는 <span className="font-bold">청소서비스</span>
          </h1>
          
          <p className="text-xl sm:text-2xl opacity-90 mb-10 font-medium">
            에코클린 찾아가는 청소 정기구독 서비스 런칭
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

      {/* Hero Image - Cleaning Supplies */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative overflow-hidden h-[300px] md:h-[500px]">
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          src="https://i.pinimg.com/1200x/6c/f7/81/6cf78124ccd78ddf80764a3ba6d34471.jpg"
          alt="Professional Cleaning Supplies"
          className="w-full h-full object-contain rounded-t-[3rem]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-t-[3rem]" />
      </div>
    </section>
  );
}
