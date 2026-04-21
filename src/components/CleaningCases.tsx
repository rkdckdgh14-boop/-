import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

const cases = [
  {
    id: 'bathroom',
    title: '욕실 청소 사례',
    subtitle: '물때와 곰팡이 걱정 없는 쾌적한 공간',
    description: '세면대, 욕조, 변기는 물론 타일 사이사이의 미세한 곰팡이까지 완벽하게 제거합니다. 호텔 같은 깔끔함을 느껴보세요.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
    points: ['천정/벽면 살균 세척', '수전/도기 광택 작업', '배수구 고온 스팀 살균', '환풍기 분해 청소']
  },
  {
    id: 'living',
    title: '거실 청소 사례',
    subtitle: '가족이 머무는 가장 넓고 중요한 쉼터',
    description: '바닥의 미세먼지뿐만 아니라 소파 밑, 벽면 아트월, 전등갓 상단까지 평소 손이 닿지 않는 곳까지 정밀하게 청소합니다.',
    image: 'https://i.pinimg.com/1200x/02/42/59/0242595a0a681c5a5c0dd1b4ccd098f9.jpg',
    points: ['바닥 습식/건식 정밀 청소', '전등/몰딩 먼지 제거', '창틀 및 방충망 세척', '벽면 및 가전 표면 닦기']
  },
  {
    id: 'kids',
    title: '아이방 청소 사례',
    subtitle: '면역력 약한 우리 아이를 위한 안심 공간',
    description: '아이들의 건강을 위해 친환경 세제만을 사용하며, 장난감과 교구의 미세 세균까지 99.9% 살균 처리합니다.',
    image: 'https://i.pinimg.com/736x/76/e1/61/76e1611d81b60a78aade6f9c011e758b.jpg',
    points: ['장난감/교구 살균 소독', '침구류 먼지 진드기 제거', '친환경 안심 세제 사용', '공기 정화 및 탈취 서비스']
  }
];

export default function CleaningCases() {
  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-widest italic">Success Stories</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              에코클린의<br />
              <span className="text-primary">완벽한 청소 사례</span>를 확인하세요
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              수많은 현장에서 증명된 에코클린만의 디테일을 보여드립니다.<br />
              단순한 청소를 넘어 공간의 가치를 되찾아드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {cases.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image with Decorative frames */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex-1 w-full"
              >
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-10">
                    <div className="flex items-center text-white space-x-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-black">만족도 100% 현장</span>
                    </div>
                  </div>
                </div>
                {/* Decorative backgrounds */}
                <div className={`absolute -inset-4 bg-primary/5 rounded-[4rem] -z-10 ${index % 2 === 1 ? 'rotate-2' : '-rotate-2'}`} />
                <div className={`absolute -inset-8 bg-accent/5 rounded-[5rem] -z-20 ${index % 2 === 1 ? '-rotate-3' : 'rotate-3'}`} />
              </motion.div>

              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{item.title}</h2>
                  <h3 className="text-xl font-bold text-primary mb-6">{item.subtitle}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-gray-800 font-bold text-sm tracking-tight">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <div className="flex items-center space-x-4 p-5 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 italic font-medium text-gray-400">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <span>전담 매니저의 육안 검수 및 살균 서비스가 기본 포함됩니다.</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE & AFTER Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight italic uppercase">Before & After</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            <p className="text-gray-500 font-bold text-lg pt-4">에코클린이 선사하는 확실한 공간의 변화를 눈으로 직접 확인하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { before: 'https://cdn.imweb.me/thumbnail/20260116/c14fd35ac3c12.png', after: 'https://cdn.imweb.me/thumbnail/20260116/903e916a4af88.png', title: '배수구 찌든때 제거' },
              { before: 'https://cdn.imweb.me/thumbnail/20260116/71b2aec8d16f7.png', after: 'https://cdn.imweb.me/thumbnail/20260116/c130eaf417ad0.png', title: '수전 물때 광택 복원' },
              { before: 'https://cdn.imweb.me/thumbnail/20260116/7e7f106475555.png', after: 'https://cdn.imweb.me/thumbnail/20260116/42703e3d8c3b0.png', title: '가스레인지 기름때 제거' },
              { before: 'https://cdn.imweb.me/thumbnail/20260116/2e5e0eb6622f5.png', after: 'https://cdn.imweb.me/thumbnail/20260116/de50af3c57477.png', title: '창틀 먼지 살균 청소' }
            ].map((pair, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h4 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-black italic">0{idx + 1}</span>
                  {pair.title}
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Before */}
                  <div className="relative flex-1 group">
                    <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                      <img src={pair.before} alt="Before" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest z-20">Before</div>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black text-white/60 z-20">에코클린 Verified</div>
                  </div>
                  {/* After */}
                  <div className="relative flex-1 group">
                    <div className="aspect-square rounded-3xl overflow-hidden shadow-xl ring-4 ring-primary/20">
                      <img src={pair.after} alt="After" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest z-20 shadow-lg animate-pulse">After</div>
                    <div className="absolute bottom-4 right-4 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black text-white/80 z-20">에코클린 Quality</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
            지금 고객님의 공간도<br />
            에코클린으로 변화시켜 보세요
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-accent text-white rounded-full font-black text-xl shadow-2xl hover:bg-accent-dark transition-all"
          >
            단 1분 만에 예약하기
          </motion.button>
        </div>
      </section>
    </div>
  );
}
