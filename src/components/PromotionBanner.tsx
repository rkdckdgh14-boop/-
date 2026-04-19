import React from 'react';
import { Smartphone, Calendar, Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function PromotionBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Left Side - App Promo (Blue) */}
          <div className="bg-primary p-10 md:p-16 flex flex-col justify-center items-start text-white">
            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              에코클린 앱으로<br />
              편하고 쉽게!
            </h3>
            <p className="text-white/80 font-bold mb-8 max-w-xs">
              모바일앱으로 언제 어디서나 간편하게 예약하세요.
            </p>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-primary transition-all group">
              에코클린 앱 다운로드
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side - Schedule (Orange) */}
          <div className="bg-accent p-10 md:p-16 flex flex-col justify-center items-end text-right text-white">
            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight font-sans">
              내가 원하는 날짜에<br />
              청소 서비스!
            </h3>
            <p className="text-white/80 font-bold mb-8 max-w-xs">
              서비스 신청일 자유롭게 변경가능. 원하는 날짜를 선택하세요.
            </p>
            <button 
              onClick={() => navigate('/booking')}
              className="inline-flex items-center px-6 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-accent transition-all group"
            >
               서비스날짜 설정하기
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Overlapping Phone Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-48 h-96 bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden"
            >
              <img 
                src="https://picsum.photos/seed/app-cleaning/400/800" 
                alt="App Interface" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="w-12 h-1 bg-white/50 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
