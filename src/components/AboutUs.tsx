import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Users, Target, ShieldCheck, Heart } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: '친환경 가치 실현',
      description: '인체와 환경에 무해한 친환경 세제만을 사용하여 가족의 건강을 최우선으로 생각합니다.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: '전문성 확보',
      description: '체계적인 교육 과정을 이수한 전문 클리닝 매니저가 고도의 숙련된 서비스를 제공합니다.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: '철저한 사후 관리',
      description: '서비스 완료 후 고객님의 만족도를 확인하고, 불편 사항 발생 시 즉각적인 A/S를 약속합니다.'
    }
  ];

  const stats = [
    { label: '누적 서비스 건수', value: '50,000+' },
    { label: '고객 만족도', value: '98%' },
    { label: '전문 매니저', value: '200+' },
    { label: '친환경 인증 제품', value: '100%' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4 block italic">About Eco Clean</span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              공간의 가치를 높이는<br />
              <span className="text-primary tracking-tighter italic">에코클린</span>입니다.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
              우리는 단순한 청소를 넘어, 고객님의 공간이 삶의 진정한 쉼표가 될 수 있도록<br className="hidden md:block" />
              정성을 다해 케어합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO Message / Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <img 
                  src="https://d2v80xjmx68n4w.cloudfront.net/members/portfolios/ClXFO1730860574.jpg?w=718" 
                  alt="Eco Clean Professional Cleaning" 
                  className="rounded-[3rem] shadow-2xl z-10 relative"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-gray-100 rounded-full -z-20 animate-spin-slow" />
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                  믿을 수 있는 청소업체<br />
                  내 집처럼 <span className="text-[#FF4D8D]">꼼꼼하게!</span>
                </h2>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              <div className="text-gray-600 space-y-6 text-lg font-medium leading-relaxed">
                <p>
                  이제는 시대가 많이 바뀌었습니다.
                </p>
                <p>
                  무조건 저렴한 가격과 추가비용이 발생하지 않는다는 터무니 없는 얘기는 하지 않겠습니다.
                </p>
                <p>
                  저희 에코클린은 평수에 따른 견적부터 추가적인 비용까지 있는 그대로 투명하게 운영하며
                  체계적인 프로세스와 경험 많은 전문가가 직접 현장에 방문해 청소를 진행하며
                  확실한 A/S 및 사후처리를 보장하겠습니다.
                </p>
                <div className="pt-6">
                  <p className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: '"Malgun Gothic", "맑은 고딕", sans-serif' }}>
                    대표이사 강창호
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-5xl font-black">{stat.value}</div>
                <div className="text-white/70 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">우리의 핵심 가치</h2>
            <p className="text-gray-500 font-medium">에코클린이 추구하는 세 가지 원칙입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:scale-105 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Timeline (Simplified) */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900">걸어온 길</h2>
          </div>
          <div className="space-y-12">
            {[
              { year: '2024', event: '에코클린 정기구독 서비스 런칭' },
              { year: '2022', event: '누적 서비스 30,000건 달성' },
              { year: '2020', event: '친환경 클리닝 솔루션 독자 개발' },
              { year: '2018', event: '에코클린 설립' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-8 group">
                <div className="text-2xl font-black text-primary italic tracking-tighter w-20 group-hover:scale-110 transition-transform">{item.year}</div>
                <div className="flex-grow h-[1px] bg-gray-100" />
                <div className="text-lg font-bold text-gray-700">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
